FROM node:18-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 3000
EXPOSE 5173

# for developement - no server
CMD ["npm", "run", "dev"]

# for production
# ENV ORIGIN http://localhost:3001
# RUN npm run build
# CMD ["node", "server"]
