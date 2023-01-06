FROM node:14

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 80

# [ "INSDIE CONTAINER PATH" ]
# VOLUME [ "/app/feedback" ]

CMD [ "npm", "start" ]