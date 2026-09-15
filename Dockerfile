# ---- Build stage ----
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Serve stage (Apache HTTP Server, not Nginx) ----
FROM httpd:2.4-alpine

# Serve the React production build from Apache's default document root
COPY --from=build /app/build/ /usr/local/apache2/htdocs/

# Allow client-side routing to fall back to index.html
RUN sed -i \
    -e 's#^</Directory>#    FallbackResource /index.html\n</Directory>#' \
    /usr/local/apache2/conf/httpd.conf

EXPOSE 80

CMD ["httpd-foreground"]
