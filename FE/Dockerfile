FROM node:latest AS build
COPY . /app
WORKDIR /app
# --verbose för mer detaljerad utskrift
RUN npm install --verbose
# Bygg frontend
RUN npm run build

FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
