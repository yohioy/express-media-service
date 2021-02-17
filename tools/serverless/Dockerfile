FROM lambci/lambda:build-nodejs12.x

WORKDIR /opt/app

#COPY . .

RUN npm -g config set user root

RUN npm install -g node-gyp
RUN npm install -g serverless@1.62.0