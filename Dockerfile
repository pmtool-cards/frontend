FROM node:18-alpine As build
WORKDIR /usr/app
COPY . /usr/app
RUN npm ci --legacy-peer-deps
RUN npm run build

FROM nginx:1.23.3-alpine
EXPOSE 80
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/dist /usr/share/nginx/html