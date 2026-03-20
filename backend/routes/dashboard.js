const express = require('express');
const router = express.Router();
const { getConfig, saveConfig } = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', getConfig);
router.put('/', saveConfig);

module.exports = router;
