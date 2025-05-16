# ✅ ใช้ Node.js LTS รุ่น 16 ที่ไม่มีปัญหา OpenSSL 3
FROM node:16

# ✅ กำหนด working directory ภายใน container
WORKDIR /app

# ✅ copy ไฟล์ package.json และ package-lock.json (ถ้ามี) ก่อน เพื่อให้ layer install แคชได้
COPY package*.json ./

# ✅ ติดตั้ง dependencies
RUN npm install

# ✅ copy ไฟล์ project ทั้งหมด
COPY . .

# ✅ เปิดพอร์ต 5001 ให้ Railway เข้าได้
EXPOSE 5001

# ✅ สั่งรัน index.js (ซึ่งเรายืนยันแล้วว่าเป็นไฟล์ที่รัน server จริง)ผมจะแก้ Dockerfile อีก "1 ครั้งสุดท้าย" เท่านั้น
ENTRYPOINT ["node", "index.js"]
