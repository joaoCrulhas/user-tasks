FROM node:lts

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

COPY . .

RUN npm install

RUN npx prisma generate

EXPOSE 4000
# CMD ["npm", "run", "prisma:deploy"]
CMD [ "npm", "run", "server" ]