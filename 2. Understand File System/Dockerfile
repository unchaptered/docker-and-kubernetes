FROM node:14

WORKDIR /app
# With WORKDIR /app,
    # COPY A B menas...
        # A : ./A
        # B : ./app/B

# Without WORKDIR /app,
    # COPY A B means...
        # A : ./A
        # B : ./B

COPY . /app
# Basically, COPY A B
    # A : Host file System
    # B : Image/Container File System

RUN npm install
# `RUN` command is executed by generating docker images.

EXPOSE 80
# `EXPOSE` command is written for documentation.
    # So, it's not doing nothing.
    # But, this command is recommendation for guide of protocol.

CMD ["node", "server.js"]
# `CMD` command is executed by generating docker container.

# Personal Opinion : Absolute directory is more clear than relative directory
    # Bast Practice : COPY . /app
    # Worst Practice : COPY . ./