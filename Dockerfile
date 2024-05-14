
FROM node:19-alpine3.15
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install 
# -g npm@10.7.0
# RUN npm install --force
COPY . .
RUN npm run build
FROM nginx:1.17.1-alpine
COPY --from=build usr/src/app/dist/biombillas /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80