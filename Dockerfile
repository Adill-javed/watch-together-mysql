# # Step 1: Build the application
# FROM maven:3.9.6-eclipse-temurin-17 AS build
# WORKDIR /app
# COPY pom.xml .
# COPY src ./src
# RUN mvn clean package -DskipTests
#
# # Step 2: Run the application
# FROM openjdk:17-jdk-slim
# WORKDIR /app
# COPY --from=build /app/target/*.jar app.jar
# EXPOSE 8080
# ENTRYPOINT ["java", "-jar", "app.jar"]
# Use official OpenJDK image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy jar file to the container
COPY target/watch-together-0.0.1-SNAPSHOT.jar app.jar

# Expose the Render-assigned port
EXPOSE 8080

# Use environment variable PORT for runtime port
CMD ["sh", "-c", "java -jar app.jar --server.port=${PORT}"]


