const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

// Upload config
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Routes
router.post('/register', upload.single('profileImage'), userController.register);
router.post('/login', userController.login);
router.get('/profile', auth, userController.getProfile);

module.exports = router;
