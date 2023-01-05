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

### 2.1. Host node.js will connect Dockerized Mongo.

```sh
cd ~/backend
npm ci

docker run --name test-mongo -d --rm -p 27107:27017 mongo

node app.js
```