FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env.development ./

RUN npm run build

EXPOSE 3001

CMD [ "npm", "run", "start:prod" ]