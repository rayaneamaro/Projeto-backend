const express = require('express');
const router = express.Router();
const { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/category');
const { authenticateToken } = require('../middleware/auth');

router.get('/search', getCategories);
router.get('/:id', getCategoryById);
router.post('/', authenticateToken, createCategory);
router.put('/:id', authenticateToken, updateCategory);
router.delete('/:id', authenticateToken, deleteCategory);

module.exports = router;
