# ✅ ใช้ Node.js 18 ที่รองรับ legacy OpenSSL provider
FROM node:18

# ✅ ตั้งโฟลเดอร์ทำงานภายใน container
WORKDIR /app

# ✅ คัดลอกไฟล์ package.json และ package-lock.json เพื่อแคช layer install
COPY package*.json ./

# ✅ ติดตั้ง dependencies
RUN npm install

# ✅ คัดลอกไฟล์ทั้งหมดในโปรเจกต์ลง container
COPY . .

# ✅ เปิดพอร์ต 5001 ให้ Railway เข้าถึง
EXPOSE 5001

# ✅ รัน server พร้อมเปิดใช้งาน legacy OpenSSL provider เหนื่อยมาก S นายรู้ไหม
ENTRYPOINT ["node", "--openssl-legacy-provider", "index.js"]
