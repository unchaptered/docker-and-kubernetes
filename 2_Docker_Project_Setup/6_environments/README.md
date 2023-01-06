[< Backward](../README.md)

# Environement

Docker supports build-time **ARGuemtns** and runtime **ENVironment** variables

| NAME | DESCRIPTION |
| ---- | ----------- |
| ARG  | Available inside of Dockerifle, NOT accessible in CMD or any application code <br> Set on image build (docker build) via --build-arg | 
| ENV  | Available inside of Dcokerfile, in application code <br> Set via ENV in Dockerfile or via --env on docker run |

## Get Started

```
docker build -t feedback-node:web-app .
docker build -t feedback-node:dev --build-arg DEFAULT_PORT=8000 .
```

### Clean up

```sh
# Stop all containers
docker stop $(docker ps -a -q)

# Remove all containers
docker rm $(docker ps -a -q)

# Remove all images
docker rmi $(docker images -q) 
```