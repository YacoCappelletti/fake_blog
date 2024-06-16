FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install


RUN npm install -g typescript vite


RUN chmod +x /usr/local/bin/tsc /usr/local/bin/vite

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "preview" ]