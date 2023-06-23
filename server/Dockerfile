FROM node:18

WORKDIR /app

#npm install 을 위해, package.json과 package-lock.json을 먼저 copy해둠
COPY package*.json /app/

RUN npm install

COPY . /app

EXPOSE 4000

CMD ["npm", "run", "dev"]