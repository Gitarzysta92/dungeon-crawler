FROM node:17-alpine3.14 as build

WORKDIR /app  
COPY . .
RUN npm install
RUN npm run build:docker

FROM nginx:1.21.6-alpine as prod
COPY --from=build app/deployment/nginx.conf /host/path/nginx.conf
COPY --from=build app/dist/web-client /usr/share/nginx/html/
COPY --from=build app/dist/web-client/index.html /usr/share/nginx/html/index.html
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;", "-c", "/host/path/nginx.conf"]
 