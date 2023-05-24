FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install  --force
RUN npm run build
CMD ["npm", "run", "start:prod"]
EXPOSE 3001