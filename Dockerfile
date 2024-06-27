FROM node:22-alpine3.19
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
EXPOSE 3000
