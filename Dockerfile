FROM node:15.14.0-buster-slim
WORKDIR /app
COPY . .
RUN npm install --force
RUN npm run prebuild
RUN npm run build
RUN npm i -S serve

ENV NODE_ENV development
ENV API_URL http://gateway-dev.erkam.cronos.co.id/api

EXPOSE 8080
CMD ["npm", "start"]
