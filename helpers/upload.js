const multer = require('multer')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const { TEMP_DIR } = process.env
const tempDir = path.join(process.cwd(), TEMP_DIR)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
  limits: { fileSize: 2000000 },
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true)
      return
    }
    cb(null, false)
  },
})

module.exports = upload
