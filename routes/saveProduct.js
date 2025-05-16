const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { db, bucket } = require("../firebaseConfig");

// ตั้งค่า multer ให้เก็บไฟล์ใน memory (RAM)
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/save — รับข้อมูลและรูปภาพสินค้า
router.post("/save", upload.array("images", 4), async (req, res) => {
  try {
    const { productName, productPrice, productDesc, mainType, subType, subSubType } = req.body;
    const files = req.files;

    const productId = uuidv4();
    const imageFiles = [];

    // อัปโหลดไฟล์ทั้งหมดทีละไฟล์
    for (const file of files) {
      const fileName = `products/${productId}_${file.originalname}`;
      const fileUpload = bucket.file(fileName);

      await fileUpload.save(file.buffer, {
        metadata: { contentType: file.mimetype },
      });

      // สร้าง Public URL ที่ไม่หมดอายุจริงๆนะน้องนะ
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

      imageFiles.push({
        url: publicUrl,
        name: file.originalname,
        type: file.mimetype,
        size: file.size,
      });
    }

    // เตรียมข้อมูลสินค้า
    const productData = {
      productId,
      productName,
      productPrice,
      productDesc,
      mainType,
      subType,
      subSubType,
      imageFiles,
      createdAt: new Date(),
    };

    // บันทึกใน Firestore
    await db.collection("products").doc(productId).set(productData);

    console.log("✅ Product saved with ID:", productId);
    res.status(200).send({ message: "✅ บันทึกสินค้าเรียบร้อย", productId });
  } catch (error) {
    console.error("❌ Save product error:", error);
    res.status(500).send({ error: "ไม่สามารถบันทึกสินค้าได้" });
  }
});

module.exports = router;
