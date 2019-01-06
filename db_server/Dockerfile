FROM mysql:latest
ENV MYSQL_ROOT_PASSWORD JustDance2018
COPY create_database.sql /docker_entrypoint-initdb.d/00_create_database.sql
COPY mysqld.cnf /etc/mysql/conf.d

