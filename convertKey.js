const fs = require("fs");

const key = fs.readFileSync("private_key.pem", "utf8"); // เปลี่ยนชื่อไฟล์ตามจริง
const escapedKey = key.replace(/\n/g, "\\n");

console.log(escapedKey);
