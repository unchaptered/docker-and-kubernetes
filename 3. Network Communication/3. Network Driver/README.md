[< Backward](../README.md)

# Netowrk Driver

In previous, we talked about two kind of solutions to connect between seperated Containers.

- [manual connect (dockerized mongodb&node.js)](../1.%20manual%20connect%20(dockerized%20mongodb%26node.js)/README.md)
- [automated connect (docker in same network)](../2.%20automated%20connect%20(docker%20in%20same%20network)/README.md)

Generally, automated connect is better than manual connect.<br>
This solution need about `docker network` to connect its. <br>

In this time, we can use network commands to manually create network. <br>

```sh
docker network create NETOWRK-NAME
docker network ls
```

If you type `docker network ls`, you'ld see 3 type of default network.

```sh
NETWORK ID          NAME           DRIVER    SCOPE
${De-Normalized}    bridge         bridge    local
${De-Normalized}    host           host      local
${De-Normalized}    none           null      local
${De-Normalized}    test-network   bridge    local
```

What is meaning `bridge, host, none`?

## 1. network driver

```sh
1.1. bridge 😊
1.2. host
1.3. none
1.4. overlay
1.5. macvlan
1.6. 3'rd party plugin
```

### 1.1. bridge 😊

This is default network driver.
IF you use default network driver, each container can find the others with container name.

### 1.2. host

IF you use `stand alone container`, remove isolation between container and host system.<br>
It means, docker use `localhost` to share datas.

### 1.3. none

If you use none, all networking is disabled.

### 1.4. overlay

Many kind of docker daemon can be connected other containers.<br>
This is very old/legacy/deprecated solution to connect among several containers.<br>
If you want use it, use `Swarm` mode with docker.

### 1.5. macvlan

You can add custom MAC Address.
And then you can that container to connect WWW.

### 1.6. 3'rd party plugin

etc on