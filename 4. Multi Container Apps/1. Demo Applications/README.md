[< Backward](../README.md)

# Demo Application

## 1. MongoDB Docker

```
# Host node.js connect Dockerized Mongo
docker run --name test-mongo -d --rm -p 27017:27017 mongo

# Dockerized node.js connect Dockerized Mongo
docker run --name test-mongo -d --rm mongo
```

## 2. Steps

1. Host node.js will connect Dockerized mongo.
2. Dockerized node.js will connect Dockerized mongo.
3. Dockerized react.js spa will connect Dockerized node.js

### 2.1. Host node.js will connect Dockerized mongo.

```sh
cd ~/backend
npm ci

docker run --name test-mongo -d --rm -p 27107:27017 mongo

node app.js
```

### 2.2. Dockerized node.js will connect Dockerized mongo.

1. Create Dockerfile
2. Update app.js
3. Build images and run using it.

- 2.2.1. Create Dockerfile

```Dockerfile
FROM node:14

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm ci

COPY . /app

EXPOSE 80

CMD ["node", "app.js"]
```

- 2.2.2. Update app.js

```js
// Before
mongoose.connect(
    `mongodb://127.0.0.1:27017/course-goals`,
    { /* Options */ },
    () => { /* Callbacks */ }
);

// After
const MONGO_URL = 'host.docker.internal';
mongoose.connect(
    `mongodb://${MONGO_URL}:27017/course-goals`,
    { /* Options */ },
    () => { /* Callbacks */ }
);
```

- 2.2.3. Build images and run using it.

```sh
# require ["2.1."]
docker build -t test-server:beta .


docker run --name test-backend -d --rm -p 80:80 test-server:beta
    # -p HOST_PORT:DOCKERIZED_PORT
```

### 2.3. Dockerized react.js spa will connect Dockerized node.js

- 2.3.1. Create Dockerfile

```Dockerfile
FROM node:14

WORKDIR /app

COPY package-lock.json /app

RUN npm ci

COPY . /app

CMD ["npm", "start"]
```

- 2.3.2. Build images and run using it

```sh
# require ["2.1.", "2.2."]
docker build -t test-frontend:beta .

docker run --name test-frontend -d --rm -p 3000:3000 -it test-frontend:beta
```