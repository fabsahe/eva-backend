FROM node:18 

RUN mkdir -p /home/horarios/eva-mern/backend

WORKDIR /home/horarios/eva-mern/backend

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "npm", "start" ]
