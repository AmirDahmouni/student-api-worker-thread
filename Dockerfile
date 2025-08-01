# Étape 1: builder
FROM node:24.0.0-alpine AS builder

WORKDIR /app

# Copier package.json + package-lock.json
COPY package*.json ./

# Installer dépendances (pas les dev, optionnel)
RUN npm install

# Copier tout le code source TS (src, tests, tsconfig etc.)
COPY . .

# Compiler le code TS en JS dans /app/dist
RUN npm run build

# Étape 2: image finale
FROM node:24.0.0-alpine

WORKDIR /app

# Copier seulement le dossier compilé dist + package.json (pour prod deps)
COPY --from=builder /app/dist ./
COPY --from=builder /app/package*.json ./

EXPOSE 3000

# Installer uniquement les dépendances de prod
RUN npm install --production

# Commande pour lancer l’app (adapter si besoin)
CMD ["node", "src/server.js"]
