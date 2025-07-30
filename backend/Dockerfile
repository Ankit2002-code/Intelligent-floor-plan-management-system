# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

# Stage 2: Runtime image
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY --from=build /app/target/FloorPlanManagementSystem-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

# ✅ Shell form allows $PORT to be evaluated properly
ENTRYPOINT java -Dserver.port=$PORT -jar app.jar
