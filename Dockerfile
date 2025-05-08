# Используем официальный Node.js образ
FROM node:23-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Создаем директорию для SSL сертификатов
RUN mkdir -p /app/ssl

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем исходный код
COPY . .

# Копируем сертификаты (если передаются через секреты)

RUN --mount=type=secret,id=ssl_key cat /run/secrets/ssl_key > /app/ssl/server-key.key
RUN --mount=type=secret,id=ssl_cert cat /run/secrets/ssl_cert > /app/ssl/server-cert.crt
RUN --mount=type=secret,id=ssl_ca cat /run/secrets/ssl_ca > /app/ssl/server-ca.crt


# Явно указываем порт для Vite preview
ENV PORT=3000
EXPOSE 3000

# Запуск Vite preview с правильными параметрами
CMD ["npm", "run", "build", "&&" "npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]