FROM node:18-alpine
WORKDIR /usr/local/apps/myapp/dev

COPY package.json ./
RUN npm install && npm cache clean --force

COPY tsconfig.json ./

COPY src ./src
COPY .env ./

EXPOSE ${PORT}

RUN npm run build
CMD ["npm", "run", "dev"]