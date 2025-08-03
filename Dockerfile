# Étape 1: builder
FROM node:24.0.0-alpine AS builder

WORKDIR /app

# Copier package.json + package-lock.json
COPY package*.json ./

# Installer dépendances
RUN npm ci

COPY . .

# Compiler le code TS en JS dans /app/dist
RUN npx tsc

# Étape 2: image finale
FROM node:24.0.0-alpine

WORKDIR /app

# Copier seulement le dossier compilé dist + package.json (pour prod deps)
COPY --from=builder /app/dist ./
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env ./


EXPOSE 8080

# Installer uniquement les dépendances de prod
RUN npm install

CMD ["npm", "run", "start"]
