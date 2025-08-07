FROM node:23-alpine AS builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM scratch
WORKDIR /frontend
COPY --from=builder /app/dist .