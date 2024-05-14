FROM node:19-alpine3.15 as dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install --legacy-peer-deps

FROM node:19-alpine3.15 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM nginx:1.23.3 as prod
EXPOSE 80
COPY --from=builder /app/dist/biombillas /usr/share/nginx/html
RUN rm etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
CMD [ "nginx", "-g", "daemon off;"]


#FROM node:19-alpine3.15
#WORKDIR /usr/src/app
#COPY package*.json ./
#RUN npm install 
# -g npm@10.7.0
# RUN npm install --force
#COPY . .
#RUN npm run build
#FROM nginx:1.17.1-alpine
#COPY --from=build usr/src/app/dist/biombillas /usr/share/nginx/html
#COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
#EXPOSE 80