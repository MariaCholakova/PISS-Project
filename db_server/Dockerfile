FROM mysql:5.7
ENV MYSQL_ROOT_PASSWORD JustDance2018
COPY create_database.sql /docker-entrypoint-initdb.d/
COPY mysqld.cnf /etc/mysql/conf.d

