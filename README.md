# Travelo — Kubernetes Deployment & Monitoring

Full Kubernetes deployment for the Travelo 3-tier travel booking application (React + Spring Boot + MySQL), including a complete observability stack.

## Project Structure

```
├── k8s/
│   ├── base/                  # Application manifests
│   │   ├── namespace.yaml     # Namespace + ResourceQuota
│   │   ├── deployment.yaml    # Frontend (Nginx/React) Deployment + Service
│   │   ├── backend.yaml       # Backend (Spring Boot) Deployment + Service
│   │   ├── statefulset.yaml   # MySQL StatefulSet + PVC + Service
│   │   ├── configmaps.yaml    # Application ConfigMaps
│   │   ├── secrets.yaml       # Database credentials
│   │   ├── rbac.yaml          # RBAC (ServiceAccount, Role, RoleBinding)
│   │   ├── policies.yaml      # NetworkPolicy + PodDisruptionBudget
│   │   └── gateway.yaml       # Gateway API (NGINX Gateway Fabric)
│   └── monitoring/
│       └── monitoring.yaml    # Full monitoring stack (Prometheus, Grafana, Loki, Promtail)
├── travelo-app/               # Application source code
│   ├── travelo_frontend/      # React frontend + Nginx config + Dockerfile
│   └── travelo_backend/       # Spring Boot backend + Dockerfile
├── travelo-chart/             # Helm chart (Bonus)
└── argocd-app.yaml            # ArgoCD Application (GitOps)
```

## Quick Start

```bash
# Deploy the application
kubectl apply -f k8s/base/namespace.yaml
kubectl apply -f k8s/base/

# Deploy the monitoring stack
kubectl apply -f k8s/monitoring/monitoring.yaml

# Access Grafana
minikube service grafana -n monitoring --url
# Credentials: admin / travelo-admin-2024
```

## Monitoring Stack

The monitoring namespace runs 6 pods:

| Component | Role | Access |
|-----------|------|--------|
| **Prometheus** | Metrics collection (5 scrape jobs) | NodePort 30090 |
| **Grafana** | Dashboards & visualization | NodePort 30030 |
| **Loki** | Log aggregation | Internal :3100 |
| **Promtail** | Log collection (DaemonSet) | Internal :9080 |
| **Node Exporter** | Host metrics (DaemonSet) | Internal :9100 |
| **Kube-State-Metrics** | K8s object state | Internal :8080 |

### Pre-provisioned Grafana Dashboards

1. **Infrastructure Monitoring** — CPU, RAM, disk, network per node
2. **Application Monitoring** — Pod status, CPU/memory per component, Spring Boot metrics (HTTP requests, latency, HikariCP, JVM heap)
3. **Log Monitoring** — Log volume + per-component log panels (Backend, Frontend, Database)

## Spring Boot Actuator

The backend exposes Prometheus metrics via Micrometer:
- Endpoint: `/actuator/prometheus`
- Auto-discovered by Prometheus via pod annotations
- Metrics: HTTP request rate, latency (max/avg), HikariCP connections, JVM heap

## Tech Stack

- **Frontend:** React + Nginx
- **Backend:** Spring Boot 3.4 + Java 23
- **Database:** MySQL 8 (StatefulSet)
- **Orchestration:** Kubernetes (Minikube)
- **Monitoring:** Prometheus + Grafana + Loki + Promtail
- **GitOps:** ArgoCD
- **Packaging:** Helm Chart
