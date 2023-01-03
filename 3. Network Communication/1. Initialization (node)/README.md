[< Backward](../README.md)

# Initialization (node)

This application depends on Dummy API, 'https://swapi.dev/api' for testing Network Communication.

Request from Container to WWW.


## Get Started

```
docker build -t test-server:beta .
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