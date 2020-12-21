# base image
FROM node:14.15.1

# set working directory
WORKDIR /app

# /app/node_modules/.bin 추가
ENV PATH /app/node_modules/.bin:$PATH

# app dependencies, install 및 caching
COPY package.json /app/package.json
RUN npm install
RUN npm install react-scripts

# 앱 실행
CMD ["npm", "start"]