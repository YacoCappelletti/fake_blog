FROM openjdk:17-jdk-alpine
WORKDIR /app
RUN mkdir -p /app/images
COPY target/fake_blog_backend-0.0.1-SNAPSHOT.jar java-app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "java-app.jar"]
