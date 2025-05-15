const express = require('express');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const admin = require('firebase-admin');

const router = express.Router();
const db = admin.firestore();
const bucket = admin.storage().bucket();

// ใช้ Multer รับไฟล์ upload (จำกัด 4 รูป)
const upload = multer({ storage: multer.memoryStorage() });

router.post('/save', upload.array('images', 4), async (req, res) => {
  try {
    const { productName, productPrice, productDesc, mainType, subType, subSubType } = req.body;
    const files = req.files;

    // ตรวจสอบข้อมูล
    if (!productName || !mainType) {
      return res.status(400).json({ error: 'Missing productName or mainType' });
    }

    // อัปโหลดรูปไป Storage
    const imageUrls = [];

    for (const file of files) {
      const filename = `products/${Date.now()}_${uuidv4()}_${file.originalname}`;
      const fileRef = bucket.file(filename);

      await fileRef.save(file.buffer, {
        metadata: { contentType: file.mimetype }
      });

      const url = await fileRef.getSignedUrl({
        action: 'read',
        expires: '03-01-2030'
      });

      imageUrls.push(url[0]);
    }

    // สร้างข้อมูลใน Firestore
    await db.collection('products').add({
      productName,
      productPrice,
      productDesc,
      mainType,
      subType,
      subSubType,
      images: imageUrls,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({ message: '✅ Product saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '🔥 Error saving product' });
  }
});

module.exports = router;
