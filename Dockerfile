FROM node:18-alpine


ARG DATABASE_URL=postgresql://johndoe:randompassword@host.docker.internal:5432/mydb?schema=public
WORKDIR /usr/local/apps/myapp/dev

# COPY package.json and package-lock.json files
COPY package*.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# COPY
COPY . .

RUN npm install

COPY src ./src


EXPOSE ${PORT}


CMD ["npm", "run", "dock"]