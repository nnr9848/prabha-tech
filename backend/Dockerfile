# =========================================================
# Stage 1: Build Spring Boot Application JAR
# =========================================================
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /app

COPY pom.xml .
# Pre-fetch dependencies in a cache-friendly layer
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests -B

# =========================================================
# Stage 2: Production JRE 17 Lightweight Runner
# =========================================================
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Create non-root application user for defense-in-depth security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app/target/*.jar app.jar
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 8080

ENV JAVA_OPTS="-Xms256m -Xmx512m -XX:+UseG1GC -XX:+ExitOnOutOfMemoryError"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
