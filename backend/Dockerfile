FROM node:18

#Create app directory
WORKDIR /usr/src/app

#Install app depencencies
COPY package*.json ./

RUN npm install

#Bundle app source
COPY . .

EXPOSE 5000

CMD [ "node",  "server.js"]



