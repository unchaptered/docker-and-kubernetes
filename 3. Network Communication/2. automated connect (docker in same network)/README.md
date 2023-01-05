[< Backward](../README.md)

# automated connect (docker in same network)

This application depends on Dummy API, 'https://swapi.dev/api' for testing Network Communication.

In this docs, you can learn `manaul connect` between dockerized mongo cluster and dockerized node.js application.

- Pros : Litter harder than [manual connect](../1.%20manual%20connect%20(dockerized%20mongodb%26node.js)/README.md)
- Cons : Nope

## 1. Get Started

```
docker build -t test-server:beta .

docker network create test-network

docker run --name test-mongodb  --network test-network -d --rm mongo
docker run --name test          --network test-network -d --rm -p 3000:3000 test-server:beta
```

### 1.1. Check

Check really node.js application is connected with HOST 3000 PORT....
Use this command.

```sh
netstat -ntlp | grep :27017
```

And you can check, manaully created Docker Network using this commands.

```sh
docker network create test-network
docker network ls
```

> **RESULT**

> 1. 3 kind of default network `bridge`, `host`, `none`
> 2. 1 kind of customized network `test-network`.
> ```sh
> NETWORK ID         NAME           DRIVER    SCOPE
> ${De-Normalized}   bridge         bridge    local
> ${De-Normalized}   host           host      local
> ${De-Normalized}   none           null      local
> ${De-Normalized}   test-network   bridge    local
> ```
### 1.2. Clean up

```sh
# Stop all containers
docker stop $(docker ps -a -q)

# Remove all containers
docker rm $(docker ps -a -q)

# Remove all images
docker rmi $(docker images -q) 
```

## MongoDB Connect Guide

In previous solutions, we talked about [manual connect between dockerized mongo cluster and node.js application](../1.%20manual%20connect%20(dockerized%20mongodb%26node.js)/README.md).

In it, we guide 3 type of sinario about it.

1. Host Mongo + Host Node
2. Host Mongo + Dockerized Node
3. Dockerized Mongo + Dockerized Node

IF we use docker to build service, we could choice `2` or `3`.<br>

| Choice | Pros                                 | Cons                                  |
| :----: | ------------------------------------ | ------------------------------------- |
| 2      | Flexible Connection                  | Must install mongo in Host Machine    |
| 3      | Don't install mongo in Host Macine   | Inflexible Connection                 |

So, we can use `4`.

4. Dockerized Mongo + Dockerized Node in `Same Network`.

```js
const CONTAINER_NAME = 'test-mongodb';

mongoose.connect(
  `mongodb://${CONTAINER_NAME}:27017/swfavorites`,
  { useNewUrlParser: true },
  (err) => { /* Error Handler */ }
);
```

This solution has 2 pros.

1. Very Flexible Connection
2. Don't install mongo in Host Machine.