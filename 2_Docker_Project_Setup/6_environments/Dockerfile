FROM node:14

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ARG DEFAULT_PORT=80

# Static Environment Value
# ENV PORT 80

# Dynamic Environment Value
ENV PORT $DEFAULT_PORT

EXPOSE $PORT

# [ "INSDIE CONTAINER PATH" ]
# VOLUME [ "/app/feedback" ]

CMD [ "npm", "start" ]