#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RUN_DIR="$ROOT_DIR/.run"

DB_CONTAINER="travelo-database"
DB_IMAGE="mysql:8.0"
DB_ROOT_PASSWORD="chaima2003"
DB_NAME="travelo_db"
DB_PORT="3306"

BACKEND_DIR="$ROOT_DIR/travelo_backend"
FRONTEND_DIR="$ROOT_DIR/travelo_frontend"

BACKEND_URL="http://localhost:8080/api/hello"
FRONTEND_URL="http://localhost:3000"

BACKEND_LOG="$RUN_DIR/backend.log"
FRONTEND_LOG="$RUN_DIR/frontend.log"
BACKEND_PID_FILE="$RUN_DIR/backend.pid"
FRONTEND_PID_FILE="$RUN_DIR/frontend.pid"

SPRING_DATASOURCE_URL="jdbc:mysql://localhost:3306/travelo_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC"

usage() {
  cat <<EOF
Usage: ./dev-stack.sh [up|down|status|restart]

  up      Start DB + backend + frontend
  down    Stop frontend + backend + DB
  status  Show current stack status
  restart Restart full stack
EOF
}

is_http_up() {
  local url="$1"
  curl -fsS "$url" >/dev/null 2>&1
}

is_container_running() {
  docker ps --format '{{.Names}}' | grep -Fxq "$DB_CONTAINER"
}

container_exists() {
  docker ps -a --format '{{.Names}}' | grep -Fxq "$DB_CONTAINER"
}

read_pid_file() {
  local pid_file="$1"
  if [[ -f "$pid_file" ]]; then
    tr -d '[:space:]' < "$pid_file"
  fi
}

kill_from_pid_file() {
  local pid_file="$1"
  local pid
  pid="$(read_pid_file "$pid_file" || true)"

  if [[ -n "${pid:-}" ]] && kill -0 "$pid" 2>/dev/null; then
    kill "$pid" 2>/dev/null || true
  fi

  rm -f "$pid_file"
}

listening_pids_on_port() {
  local port="$1"

  if command -v lsof >/dev/null 2>&1; then
    lsof -tiTCP:"$port" -sTCP:LISTEN 2>/dev/null || true
    return
  fi

  ss -ltnp "sport = :$port" 2>/dev/null \
    | awk -F'pid=' 'NR>1 {split($2,a,","); print a[1]}' \
    | sed '/^$/d' \
    || true
}

kill_processes_on_port() {
  local port="$1"
  local pids
  pids="$(listening_pids_on_port "$port")"

  if [[ -n "${pids:-}" ]]; then
    while IFS= read -r pid; do
      [[ -z "$pid" ]] && continue
      kill "$pid" 2>/dev/null || true
    done <<< "$pids"
  fi
}

wait_for_http() {
  local url="$1"
  local attempts="$2"
  local label="$3"

  local i
  for ((i = 1; i <= attempts; i++)); do
    if is_http_up "$url"; then
      echo "$label is ready: $url"
      return 0
    fi
    sleep 1
  done

  echo "$label did not become ready in time. Check logs:"
  echo "  Backend: $BACKEND_LOG"
  echo "  Frontend: $FRONTEND_LOG"
  return 1
}

wait_for_db() {
  local i
  for ((i = 1; i <= 60; i++)); do
    if docker exec "$DB_CONTAINER" mysqladmin ping -uroot -p"$DB_ROOT_PASSWORD" --silent >/dev/null 2>&1; then
      echo "Database is ready on port $DB_PORT"
      return 0
    fi
    sleep 1
  done

  echo "Database did not become ready in time."
  return 1
}

start_db() {
  echo "Starting database..."

  if is_container_running; then
    echo "Database container is already running."
  elif container_exists; then
    docker start "$DB_CONTAINER" >/dev/null
    echo "Started existing database container."
  else
    docker run -d \
      --name "$DB_CONTAINER" \
      -e MYSQL_ROOT_PASSWORD="$DB_ROOT_PASSWORD" \
      -e MYSQL_DATABASE="$DB_NAME" \
      -p "$DB_PORT:3306" \
      "$DB_IMAGE" >/dev/null
    echo "Created and started new database container."
  fi

  wait_for_db
}

start_backend() {
  echo "Starting backend..."

  if is_http_up "$BACKEND_URL"; then
    echo "Backend is already running."
    return
  fi

  mkdir -p "$RUN_DIR"

  (
    cd "$BACKEND_DIR"
    chmod +x mvnw
    nohup env SPRING_DATASOURCE_URL="$SPRING_DATASOURCE_URL" ./mvnw spring-boot:run > "$BACKEND_LOG" 2>&1 &
    echo $! > "$BACKEND_PID_FILE"
  )

  wait_for_http "$BACKEND_URL" 180 "Backend"
}

start_frontend() {
  echo "Starting frontend..."

  if is_http_up "$FRONTEND_URL"; then
    echo "Frontend is already running."
    return
  fi

  mkdir -p "$RUN_DIR"

  (
    cd "$FRONTEND_DIR"

    if [[ ! -d node_modules ]]; then
      npm install
    fi

    nohup env BROWSER=none npm start > "$FRONTEND_LOG" 2>&1 &
    echo $! > "$FRONTEND_PID_FILE"
  )

  wait_for_http "$FRONTEND_URL" 240 "Frontend"
}

show_status() {
  echo "--- Stack status ---"

  if is_container_running; then
    echo "DB: running ($DB_CONTAINER)"
  else
    echo "DB: stopped ($DB_CONTAINER)"
  fi

  if is_http_up "$BACKEND_URL"; then
    echo "Backend: running (http://localhost:8080)"
  else
    echo "Backend: stopped"
  fi

  if is_http_up "$FRONTEND_URL"; then
    echo "Frontend: running (http://localhost:3000)"
  else
    echo "Frontend: stopped"
  fi

  echo "Logs:"
  echo "  $BACKEND_LOG"
  echo "  $FRONTEND_LOG"
}

stop_stack() {
  echo "Stopping frontend..."
  kill_from_pid_file "$FRONTEND_PID_FILE"
  kill_processes_on_port 3000

  echo "Stopping backend..."
  kill_from_pid_file "$BACKEND_PID_FILE"
  kill_processes_on_port 8080

  echo "Stopping database..."
  if is_container_running; then
    docker stop "$DB_CONTAINER" >/dev/null
    echo "Database container stopped."
  else
    echo "Database container already stopped."
  fi
}

start_stack() {
  start_db
  start_backend
  start_frontend
  show_status
}

command="${1:-up}"

case "$command" in
  up|start)
    start_stack
    ;;
  down|stop)
    stop_stack
    show_status
    ;;
  status)
    show_status
    ;;
  restart)
    stop_stack
    start_stack
    ;;
  *)
    usage
    exit 1
    ;;
esac
