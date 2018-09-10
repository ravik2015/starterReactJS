FROM node:carbon
MAINTAINER "Alfonso Valdes"

RUN apt-get update && apt-get install -y nginx supervisor && rm -rf /var/lib/apt/lists/*

ADD . /opt/www
ADD supervisor/site.conf /etc/nginx/sites-enabled/default
ADD supervisor/supervisor.conf /etc/supervisor.conf

WORKDIR /opt/www
#CMD ["npm","start"]
CMD ["/usr/bin/supervisord","-c","/etc/supervisor.conf"]
