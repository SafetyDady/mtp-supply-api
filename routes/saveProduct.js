const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// Firebase references
const db = admin.firestore();
const bucket = admin.storage().bucket();

// Multer config (รับไฟล์จาก memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/save', upload.array('images', 4), async (req, res) => {
  try {
    console.log('📥 BODY:', req.body);
    console.log('📸 FILES:', req.files);

    const { productName, productPrice, productDesc, mainType, subType, subSubType } = req.body;
    const files = req.files;

    if (!productName || !mainType) {
      return res.status(400).json({ error: '❌ Missing productName or mainType' });
    }

    if (!files || files.length === 0) {
      return res.status(400).json({ error: '❌ ไม่มีไฟล์รูปภาพแนบมา' });
    }

    const imageUrls = [];

    for (const file of files) {
      const filename = `products/${uuidv4()}_${file.originalname}`;
      const fileRef = bucket.file(filename);

      await fileRef.save(file.buffer, {
        metadata: { contentType: file.mimetype },
      });

      const [url] = await fileRef.getSignedUrl({
        action: 'read',
        expires: '03-01-2030',
      });

      imageUrls.push(url);
    }

    const newDoc = await db.collection('products').add({
      productName,
      productPrice: parseFloat(productPrice),
      productDesc,
      mainType,
      subType,
      subSubType,
      imageURLs: imageUrls,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`✅ Product saved with ID: ${newDoc.id}`);

    return res.json({ message: '✅ บันทึกสินค้าสำเร็จผ่าน backend!' });
  } catch (error) {
    console.error('❌ Save product error:', error);
    return res.status(500).json({ error: '❌ เกิดข้อผิดพลาดในการบันทึกสินค้า' });
  }
});

module.exports = router;
