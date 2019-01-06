FROM java:8
COPY ./fashionDays /var/www/java/fashionDays
WORKDIR /var/www/java/fashionDays
RUN javac *.java \ 
    && jar cfm Server.jar manifest.txt *.class
CMD ["java", "-jar", "Server.jar"]

