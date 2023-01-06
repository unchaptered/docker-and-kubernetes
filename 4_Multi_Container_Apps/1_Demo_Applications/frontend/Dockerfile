FROM node:14

WORKDIR /app

COPY package-lock.json /app
COPY package.json /app

RUN npm ci

COPY . /app

CMD ["npm", "start"]