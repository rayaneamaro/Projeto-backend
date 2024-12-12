const express = require('express');
const router = express.Router();
const { getUserById, createUser, updateUser, deleteUser, generateToken } = require('../controllers/user');
const { authenticateToken } = require('../middleware/auth');

router.get('/:id', getUserById);
router.post('/', authenticateToken, createUser);
router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, deleteUser);
router.post('/token', generateToken);

module.exports = router;
