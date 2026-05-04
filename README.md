# Travelo K8s Manifests

Kubernetes manifests for the Travelo 3-tier application.

## Structure

- k8s/base/ — core application manifests (namespace, backend, frontend, database, etc.)
- k8s/monitoring/ — monitoring stack (Prometheus, Grafana)

## Usage

kubectl apply -f k8s/base/
