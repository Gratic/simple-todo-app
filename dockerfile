FROM node:22-alpine3.20
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
CMD ["npm", "run", "prod"]
EXPOSE 3000