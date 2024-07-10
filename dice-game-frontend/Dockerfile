# Étape de build
FROM node:18 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY ./package*.json ./
RUN npm install

# Copier le reste de l'application
COPY ./ .

# Construire l'application React
RUN npm run build

# Étape de production
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de build depuis l'étape précédente
COPY --from=build /app/build ./build
COPY ./server.js .

# Installer les dépendances de production
COPY ./package*.json ./
RUN npm install --only=production

# Exposer le port sur lequel l'application écoute
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["node", "server.js"]
