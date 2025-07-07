FROM node:20

# Installe sqlite3 pour la base de données
RUN apt update && apt install -y sqlite3

# Crée le dossier de travail
WORKDIR /home

# Copie les fichiers nécessaires (code + dépendances)
COPY . ./

# Rend le script exécutable
RUN chmod 755 ./script.sh

# Ouvre le port de l'app
EXPOSE 3000

# Lance ton script de démarrage
ENTRYPOINT [ "bash", "./script.sh" ]
