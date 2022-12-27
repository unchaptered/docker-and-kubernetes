[< Previous Docs](../README.md)

# Third Docker - Optimizim Caching

Setup `--watch` option with docker.

| ROW | TITLE      | New Steps | Details |
| --- | ---------- | ----- | ------- |
| 1 | [First Docker](https://github.com/unchaptered/docker-and-kubernetes/tree/main/1.%20First%20Docker) | Setup Docker <br> Build Dockerfile <br> Run Dockerfile | init |
| 2 | [Second Docker - File System](https://github.com/unchaptered/docker-and-kubernetes/tree/main/2.%20Second%20Docker%20-%20File%20System) | - | 
| 3 | [Third Docker - Optimizim Caching](https://github.com/unchaptered/docker-and-kubernetes/tree/main/3.%20Third%20Docker%20-%20Optimizim%20Caching) | - |

## Get Started

```cmd
docker build .
docker run -p 3000:80 DOCKER-ID
```

- 3000 means `your local port'.
- 80 means 'your code port in docker'.

### What is docker caching?

Docker run only changing commands...

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