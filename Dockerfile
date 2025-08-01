# une image Node.js officielle pour la version 22.12.0
FROM node:22.12.0-alpine

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]