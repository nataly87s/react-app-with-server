FROM node:8.0.0-alpine AS build

COPY package.json yarn.lock /src/
WORKDIR /src/
RUN yarn

COPY . /src/
RUN yarn build

FROM node:8.0.0-alpine AS release

RUN yarn global add serve

COPY --from=build /src/build/ /opt/app/build/
WORKDIR /opt/app/

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

ENTRYPOINT [ "serve", "-p", "3000", "-s", "build" ]
