const express = require('express');
const router = express.Router();
const { getAll, getById, create, update, remove } = require('../controllers/ordersController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
