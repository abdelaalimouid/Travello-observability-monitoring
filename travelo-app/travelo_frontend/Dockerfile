FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --prefer-offline

COPY . .

RUN npm run build

FROM nginx:1.27-alpine AS runtime

RUN apk add --no-cache wget

RUN apk update && apk upgrade --no-cache

RUN chown -R nginx:nginx /var/cache/nginx /var/log/nginx /etc/nginx/conf.d && touch /var/run/nginx.pid && chown nginx:nginx /var/run/nginx.pid

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html

RUN chown -R nginx:nginx /usr/share/nginx/html

USER nginx

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD wget -qO- http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]

#OCI labels
LABEL org.opencontainers.image.title="Travelo Frontend"
LABEL      org.opencontainers.image.description="React SPA for the Travelo flight booking app, served by Nginx"
LABEL      org.opencontainers.image.version="1.0.0"