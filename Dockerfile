FROM nginx
MAINTAINER fulsh
ENV RUN_USER nginx
ENV RUN_GROUP nginx
ENV DATA_DIR /data/web
COPY dist /data/web/
ADD nginx/nginx.conf /etc/nginx/nginx.conf
ADD nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT nginx -g "daemon off;"
