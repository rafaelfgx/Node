FROM node:slim
WORKDIR /app
COPY package.json tsconfig.json tsconfig.build.json ./
RUN npm install
COPY ./src ./src
RUN npm run build
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/main.js"]
