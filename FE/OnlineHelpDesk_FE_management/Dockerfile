# 1. Sử dụng image node.js chính thức từ Docker Hub với version 20
FROM node:20.16.0 AS build

# 2. Thiết lập thư mục làm việc bên trong container
WORKDIR /src/app


# 3. Copy file package.json và package-lock.json để cài đặt dependencies
COPY package*.json ./

# 4. Cài đặt các dependencies cho dự án React
RUN npm install

# 5. Copy toàn bộ mã nguồn vào container
COPY . .


EXPOSE 4202 


CMD ["npm", "start", "--host"]

