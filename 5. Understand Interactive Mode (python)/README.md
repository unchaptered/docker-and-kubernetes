[< Previous Docs](../README.md)

# Understand Interactive Mode (python)

Setup `--watch` option with docker.

| ROW | TITLE      | New Steps | Details |
| --- | ---------- | ----- | ------- |
| 1 | [Initialization (node)](https://github.com/unchaptered/docker-and-kubernetes/tree/main/1.%20Initialization%20(node)) | Setup Docker <br> Build Dockerfile <br> Run Dockerfile | init |
| 2 | [Understand File System (node)](https://github.com/unchaptered/docker-and-kubernetes/tree/main/2.%20Understand%20File%20System%20(node)) | - | 
| 3 | [Understand Layer (node)](https://github.com/unchaptered/docker-and-kubernetes/tree/main/3.%20Understand%20Layer%20(node)) | Cache node_modules |
| 4 | [Understand Attached & Detached Mode (node)](https://github.com/unchaptered/docker-and-kubernetes/tree/main/4.%20Understand%20Attached%20&%20Detached%20Mode%20(node)) | Switch Attach & Detach Mode |
| 5 | [Understand Interactive Mode (python)](https://github.com/unchaptered/docker-and-kubernetes/tree/main/5.%20Understand%20Interactive%20Mode%20(python)) | Interactive mode |

## 1. Get Started

```cmd
docker build .

# USING RUN
docker run -p 3000:80 CONTAINER-ID


# USING START
docker start CONTAINER-NAME
docker attach CONTAINER-NAME

docker start -a CONTAINER-NAME # Attach mode with start

docker logs CONTAINER-NAME
docker logs -f CONTAINER-NAME # Keep waiting new logs

# INTERACTIVE MODE (same...)
docker run -i -t CONTAINER-ID
docker run -it CONTAINER-ID
```

- 3000 means `your local port'.
- 80 means 'your code port in docker'.

### 1.1. What is docker caching?

Docker run only changing commands line...

It depends on command layers in `Dockerfile`.

```dockerfile
FROM node:14 # Layer 1

WORKDIR /app # Layer 2

COPY . /app # Layer 3

RUN npm install # Layer 4

EXPOSE 80 # Layer 5

CMD ["node", "server.js"]
```

### 1.2. docker run vs docker start

```
docker run -p LOCAL-PORT:CONTANER-PORT CONTAINER-ID

docker start CONTAINER-NAME
```

- `RUN` command is blocking your terminal.
    - default mode is `attached`.
- `START` command don't block your terminal.
    - default mode is `detached`.

### 1.3. attached vs detached

- `Attached` means 'connect to node.js console'.
- `Detaced` is not.

### 1.4. Interactive Mode

Basically, Docker Application can't interact dev's keyboards and so on...

So, we need to enable `Interactive Mode` to connect these system.

#### 1.4.1. Interactive Mode in `RUN`

```cmd
docker run -i -t CONTAINER-ID
docker run -it CONTAINER-ID
```

#### 1.4.2. Interactive Mode in `START`


_Before running..._

```cmd
docker start -a -i CONTAINER-ID
```

- option `a` : start with attached mode
- option `i` : start with interactive mode

## 2. Environment

```
OS : Windows 11 Home 21H2 (22000 build release)
```