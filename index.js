const express = require('express');
const cors = require('cors');
require('dotenv').config(); // ยังใช้ได้สำหรับ PORT

const app = express();
app.use(cors());
app.use(express.json());

// ⬇️ เรียกใช้ Firebase จาก config ใหม่
const { admin, db, bucket } = require('./firebaseConfig');

// ✅ ทดสอบ
app.get('/', (req, res) => {
  res.send('🚀 MTP Supply Backend API is running (with firebaseConfig)');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});

const saveProductRoute = require('./routes/saveProduct');
app.use('/api', saveProductRoute);
