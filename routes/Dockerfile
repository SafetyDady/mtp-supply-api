# ใช้ Node.js เวอร์ชัน 18 ที่รองรับ legacy OpenSSL
FROM node:18

# ตั้ง working directory เป็น /app
WORKDIR /app

# คัดลอก package.json และ lock file แล้วติดตั้ง dependencies
COPY package*.json ./
RUN npm install

# คัดลอกไฟล์ทั้งหมดในโปรเจกต์ไปยัง container
COPY . .

# เปิดพอร์ต 5001 ให้ Railway เข้าได้
EXPOSE 5001

# สั่งรัน server ด้วย legacy OpenSSL provider (แก้ปัญหา ERR_OSSL_UNSUPPORTED)
CMD ["node", "--openssl-legacy-provider", "index.js"]
