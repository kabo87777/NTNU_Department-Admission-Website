FROM caddy:2.6.2

ADD ./dist/ /app
COPY ./Caddyfile /etc/caddy/Caddyfile
