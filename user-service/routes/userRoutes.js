const express = require('express');
const {
    registerUser,
    loginUser,
    getUserDetails,
    updateUser,
    deleteUser,
} = require('../controllers/userController');
const { authenticate } = require('../../shared/middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', authenticate, getUserDetails);
router.put('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, deleteUser);

module.exports = router;
