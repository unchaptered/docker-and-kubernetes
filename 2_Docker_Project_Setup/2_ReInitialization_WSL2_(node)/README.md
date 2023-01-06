[< Backward](../README.md)

# Initialization (node)

## 1. Get Started

```sh
docker build -t sample-image .
    # t : image-name

docker run -p 3000:80 -d --name sample-container --rm sample-image

    # -p 3000:80 / port fowarding (local) 3000 to (container) 80
    # -d / change detached mode
    # --name / apply name to container
    # --rm / automatically remove container after shutdown.

# Remove all containers and images

docker rm -f $(docker ps -aq)
docker rmi $(docker images -q)
```

## 2. Data Section

What kind of data exsists in docker?
Basically, we have 3 kind of datas using docker.

1. Application Data (Code + Environment) in `Image`.
2. Temporary App Data (e.g. entered user inputs) in `Container`.
3. Permanent App Data (e.g. user accounts) in `Volume Levelw`.

To manage these kind of datas, docker system has 2 kind of core concept.

1. `Volume` _is managed by docker_.
2. `Bind Mounts` _is managed by host(you)_.

### 2.1. What is `Volume`?

Docker volume is positioned in real host's directory.<br>
This directory is connected by container's directry.

- 1 : 1 = Host Directory : Container Directory

#### 2.1.1. Core concept of volume.

Volume save data as persistant.<br>
It has these core concept.

1. Volume Folder is mapped into Host Machine's Folder.
2. This Folder is managed by Docker Machine.
3. Basically, Host User cannot access and do not access it. (NEVER)
4. More detailed...
    4.1. When you run container with --rm, anonymous volumes is automatically deleted.
    4.2. When you run container without --rm, anonymous volumes is not deleted.
        4.2.1. If you want remove anonymous volume, type `docker volume rm VOL_NAME` or `docker volume prune`.

#### 2.1.2. EXAMPLE : anonymouse volume

```sh
docker build -t sample-image .
    # t : image-name

docker run -p 3000:80 -d --name sample-container --rm sample-image
```

```dockerfile
FROM node:14

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 80

# [ "INSDIE CONTAINER PATH" ]
VOLUME [ "/app/feedback" ]

CMD [ "node", "server.js" ]
```

#### 2.1.3. EXAMPLE : named volume

```dockerfile
docker build -t sample-image .
    # t : image-name

docker run -p 3000:80 -d --name sample-container --rm -v sample:/app/feedback sample-image
```

### 2.2. What is `Bind Mounts`?

#### 2.2.1. EXAMPLE : Bind Mounts

- only `absolute_project_path`, except last file name.
- only use `/`, except `\`.

```sh
docker run -p 3000:80 -d --rm --name sample-container -v sample:/app/feedback -v absolute_proejct_path:/app sample-image

# macOS / Linux
docker run -p 3000:80 -d --rm --name sample-container -v sample:/app/feedback -v ${pwd}:/app sample-image

docker run -p 3000:80 -d --rm --name sample-container -v sample:/app/feedback -v "%cd%":/app sample-image
```


## 3. Troubles

### 3.1. Volume cannot allow (node.js) fs.rename...
- Base Code

```javascript
const func = async () => {
    await fs.rename(tempFilePath, finalFilePath);
};
```

- Error

```cmd
(node:1) UnhandledPromiseRejectionWarning: Error: EXDEV: cross-device link not permitted, rename '/app/temp/aaaa.txt' -> '/app/feedback/aaaa.txt'
(Use `node --trace-warnings ...` to show where the warning was created)
(node:1) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:1) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code
```

- After Code

```javascript
const func = async () => {
    await fs.copyFile(tempFilePath, finalFilePath);
    await fs.unlink(tempFilePath);
};
```

### 3.2. Bind Mounts occures error with cannot find node_modules....

> This trouble is very important. <br>
> So I reccomend to watch `53. video(7:52) in section 3.`.

- Base Code

```sh
docker build -t sample-image .

docker run -p 3000:80 -d --name sample-container -v sample:/app/feedback -v absolute_proejct_path:/app sample-image

docker logs -f sample-container
```

- Error

```cmd
Error: Cannot find module 'express'
Require stack:
- /app/server.js
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:902:15)
    at Function.Module._load (internal/modules/cjs/loader.js:746:27)
    at Module.require (internal/modules/cjs/loader.js:974:19)
    at require (internal/modules/cjs/helpers.js:101:18)
    at Object.<anonymous> (/app/server.js:5:17)
    at Module._compile (internal/modules/cjs/loader.js:1085:14)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1114:10)
    at Module.load (internal/modules/cjs/loader.js:950:32)
    at Function.Module._load (internal/modules/cjs/loader.js:790:12)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:75:12) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [ '/app/server.js' ]
}
```

- WHY?

Docker Machine cannot override Host Files.<br>
But, when we use Bind Mounts, Host Files ovverides container's Files.<br>

In host directory, node_modules is not exsists. <br>
So, container's node-modules is deleted by host files...

- Solution

```sh
docker build -t sample-image .

docker run -p 3000:80 -d --name sample-container -v sample:/app/feedback -v absolute_proejct_path:/app -v app/node_modules sample-image

# Or
docker run -p 3000:80 -d --name sample-container -v sample:/app/feedback -v "%cd%":/app -v app/node_modules sample-image

docker logs -f sample-contnainer
```

> path:/app is `Bind Mounts` <br>
> not-path:/app is `Named Volume` <br>
> /app is `Anonymous volume`

### 3.3. Bind Mounts + nodemon is not working in WSL2 (Windows 11 Home 21H2 (22000 release))