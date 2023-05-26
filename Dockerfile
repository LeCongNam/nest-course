FROM node:hydrogen-alpine
WORKDIR /app/
COPY ["package.json", "package-lock.json*", "./"]
ENV NODE_OPTIONS=--max_old_space_size=2048
RUN export $(cat .env) && npm install --force

RUN echo '#!/usr/bin/env sh' > start.sh && echo 'export $(cat .env) && npm run start ${@}' >> start.sh
CMD ["sh", "./start.sh"]
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start:prod"]
