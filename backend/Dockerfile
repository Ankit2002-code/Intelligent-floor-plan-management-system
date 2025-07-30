# Stage 1: Build the application
# Use a Maven image with OpenJDK 21 for building the Spring Boot application,
# to support projects compiled for Java 21.
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Set the working directory inside the container for the build stage.
WORKDIR /app

# Copy the Maven project files (pom.xml) first to leverage Docker's caching.
# This step only invalidates the cache if pom.xml changes.
COPY pom.xml .

# Copy the source code. This invalidates the cache if any source file changes.
COPY src ./src

# Build the Spring Boot application.
# Using 'mvn clean package -DskipTests' is generally preferred for Docker builds
# to create the executable JAR without installing it to a local Maven repo inside the container.
RUN mvn clean package -DskipTests

# Stage 2: Create the final runtime image
# Use a lightweight OpenJDK JRE (Java Runtime Environment) image for the final application.
# 'eclipse-temurin:21-jre-alpine' is the corresponding JRE for Java 21,
# and it's a good choice for a small, production-ready image.
FROM eclipse-temurin:21-jre-alpine

# Set the working directory for the runtime stage.
WORKDIR /app

# Copy the built JAR file from the 'build' stage to the current stage.
# The JAR file is typically found in the 'target' directory after a Maven build.
# Make sure to replace 'FloorPlanManagementSystem-0.0.1-SNAPSHOT.jar' with the actual name
# of your JAR file if it differs.
COPY --from=build /app/target/FloorPlanManagementSystem-0.0.1-SNAPSHOT.jar app.jar

# Expose the port that your Spring Boot application will listen on.
# The default port for Spring Boot is 8080.
EXPOSE 8080

# Define the command to run your Spring Boot application when the container starts.
# Render automatically injects the $PORT environment variable, which Spring Boot
# will pick up via 'server.port'.
ENTRYPOINT ["java", "-Dserver.port=$PORT", "-jar", "app.jar"]
