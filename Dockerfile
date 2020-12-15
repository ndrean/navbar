# Step 1
FROM node:10-alpine as build-step
RUN mkdir /app
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . /app
RUN yarn build

# Stage 2
FROM nginx:1.19.15-alpine
COPY --from=build-step /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
