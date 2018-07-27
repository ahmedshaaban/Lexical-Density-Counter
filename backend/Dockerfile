FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN ln -s docker-entrypoint.sh / 

ENTRYPOINT ["./docker-entrypoint.sh"]

CMD [ "npm", "start" ]