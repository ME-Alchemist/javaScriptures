FROM node:latest
COPY . /app
WORKDIR /app
RUN npm install --verbose
EXPOSE 3000
ENTRYPOINT [ "node", "index.js" ]
