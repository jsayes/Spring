# Etapa 1: build de Angular
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm cache clean --force \
    && rm -rf node_modules package-lock.json \
    && npm install
COPY . .
RUN npm run build -- --project=diabetes-frontend --configuration production

# Etapa 2: servidor Nginx para servir la app
FROM nginx:1.25-alpine

# Copiar el build al contenedor
COPY --from=build /app/dist/diabetes-frontend /usr/share/nginx/html

# Copiar configuración personalizada de Nginx (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
