[< Previous Docs](../README.md)

# Understand Layer (node)

Setup `--watch` option with docker.

| ROW | TITLE      | New Steps | Details |
| --- | ---------- | ----- | ------- |
| 1 | [Initialization (node)](https://github.com/unchaptered/docker-and-kubernetes/tree/main/1.%20Initialization%20(node)) | Setup Docker <br> Build Dockerfile <br> Run Dockerfile | init |
| 2 | [Understand File System (node)](https://github.com/unchaptered/docker-and-kubernetes/tree/main/2.%20Understand%20File%20System%20(node)) | - | 
| 3 | [Understand Layer (node)](https://github.com/unchaptered/docker-and-kubernetes/tree/main/3.%20Understand%20Layer%20(node)) | Cache node_modules |

## Get Started

```cmd
docker build .
docker run -p 3000:80 DOCKER-ID
```

- 3000 means `your local port'.
- 80 means 'your code port in docker'.

### What is docker caching?

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

## Environment

```
OS : Windows 11 Home 21H2 (22000 build release)
```