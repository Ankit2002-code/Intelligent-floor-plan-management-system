# Stage 1: Build the application
# Use a Maven image with OpenJDK 17 for building the Spring Boot application.
FROM maven:3.8.5-openjdk-17 AS build

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
# This keeps the final image size small, as it doesn't include build tools.
FROM openjdk:17-jre-slim

# Set the working directory for the runtime stage.
WORKDIR /app

# Copy the built JAR file from the 'build' stage to the current stage.
# The JAR file is typically found in the 'target' directory after a Maven build.
# We are now explicitly using the JAR name from your .render.yaml's startCommand.
COPY --from=build /app/target/FloorPlanManagementSystem-0.0.1-SNAPSHOT.jar app.jar

# Expose the port that your Spring Boot application will listen on.
# The default port for Spring Boot is 8080.
EXPOSE 8080

# Define the command to run your Spring Boot application when the container starts.
# This command will start your Spring Boot application using the JAR.
# Render automatically injects the $PORT environment variable, which Spring Boot
# will pick up via 'server.port'.
ENTRYPOINT ["java", "-Dserver.port=$PORT", "-jar", "app.jar"]
