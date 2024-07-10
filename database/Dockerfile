# Dockerfile-mysql-db

FROM mysql:8.0

# Variables d'environnement pour MySQL
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=dice_game
ENV MYSQL_PASSWORD=root


# Copier le script d'initialisation de la base de données
COPY init-db.sql /docker-entrypoint-initdb.d/

# Exposer le port MySQL
EXPOSE 3306
