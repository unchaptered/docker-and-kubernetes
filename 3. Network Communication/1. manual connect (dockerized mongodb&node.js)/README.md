[< Backward](../README.md)

# manual connect (dockerized mognodb&node.js)

This application depends on Dummy API, 'https://swapi.dev/api' for testing Network Communication.

In this docs, you can learn `manaul connect` between dockerized mongo cluster and dockerized node.js application.

- Pros : Easy
- Cons : Every dockerized build for mongo, you must update node.js images.

## 1. Get Started

```
docker build -t test-server:beta .

docker run --name mongodb mongo
docker run --name test -d --rm -p 3000:3000 test-server:beta
```

### 1.1. Check

Check really node.js application is connected with HOST 3000 PORT....
Use this command.

```
netstat -ntlp | grep :27017
```

### 1.2. Clean up

```sh
# Stop all containers
docker stop $(docker ps -a -q)

# Remove all containers
docker rm $(docker ps -a -q)

# Remove all images
docker rmi $(docker images -q) 
```

## 2. Key Points

### 2.1. MongoDB(Host or Dockerized) + Node.js(Host or Dockerized)

[REAL CODE : app.js line 72](./app.js)

1. Host MongoDB + Host Node.js
2. Host MongoDB + Dockerized Node.js
3. [Dockerized MongoDB](https://hub.docker.com/_/mongo) + Dockerized Node.js

> After running dockerized mongodb in your host device, check your mongodb address, using `inspect` commands.
> ```sh
> docker run --name mongodb -d mongo
> docker container inspect mongodb
> ```

> In data, from `inspect`, you can find `MONGODB DATABASE ASDDRESS` inside `~/Networks/bridge/IPAddress`.
>```sh
>"Networks": {
>    "bridge": {
>        "IPAMConfig": null,
>        "Links": null,
>        "Aliases": null,
>        "NetworkID": "${De-identification}",
>        "EndpointID": "${De-identification}",
>        "Gateway": "${De-identification}",
>        "IPAddress": "${MONGODB DATABASE ADDRESS}",
>        "IPPrefixLen": ${De-identification},
>        "IPv6Gateway": "",
>        "GlobalIPv6Address": "",
>        "GlobalIPv6PrefixLen": 0,
>        "MacAddress": "${De-identification}",
>        "DriverOpts": null
>    }
>}
>```