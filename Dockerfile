FROM node:23-alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install

COPY . .

FROM alpine:latest
WORKDIR /frontend
COPY --from=builder /app/dist .