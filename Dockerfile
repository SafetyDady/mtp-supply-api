# ใช้ Node.js LTS ที่รองรับ OpenSSL Legacy
FROM node:18

# ตั้งโฟลเดอร์ทำงาน
WORKDIR /app

# ติดตั้ง dependencies
COPY package*.json ./
RUN npm install

# คัดลอกไฟล์ทั้งหมดเข้า container
COPY . .

# เปิดพอร์ต
EXPOSE 5001

# 🔥 คำสั่งสำคัญ! ใช้ legacy provider แก้ OpenSSL 3
CMD ["node", "--openssl-legacy-provider", "index.js"]
