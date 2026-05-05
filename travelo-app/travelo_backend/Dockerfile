FROM maven:3.9.9-eclipse-temurin-23-alpine AS builder

WORKDIR /app

COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2 mvn dependency:go-offline -B

COPY src ./src

RUN --mount=type=cache,target=/root/.m2 mvn package -DskipTests -B

FROM eclipse-temurin:23-jre-alpine AS runtime

RUN apk add --no-cache wget

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Update and upgrade packages to ensure the latest security patches are applied
RUN apk update && apk upgrade --no-cache

COPY --from=builder /app/target/*.jar app.jar

RUN chown appuser:appgroup app.jar

USER appuser

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 CMD wget -qO- http://localhost:8080/actuator/health | grep -q '"status":"UP"' || exit 1

ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]

CMD ["--spring.profiles.active=prod"]
#OCI-standard labels for traceability and governance.
LABEL org.opencontainers.image.title="Travelo Backend" 
LABEL org.opencontainers.image.description="Spring Boot REST API for the Travelo flight booking app" 
LABEL org.opencontainers.image.version="1.0.0"