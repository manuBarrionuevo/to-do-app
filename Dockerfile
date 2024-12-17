FROM node:18

WORKDIR /app
COPY backend ./backend
WORKDIR /app/backend
RUN npm init -y && npm install express sqlite3

CMD ["node", "server.js"]
