# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY ./package*.json ./
RUN npm install --production
COPY ./shared /app/shared
COPY ./blog-service /app/blog-service

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app /app
EXPOSE 3002
CMD ["node", "blog-service/app.js"]
