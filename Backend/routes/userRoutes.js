const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Fetch all users (only accessible by master admin)
router.get('/users', authMiddleware.authenticate, roleMiddleware.isMasterAdmin, userController.getAllUsers);

// Fetch user details by ID (accessible by the user themselves or master admin)
router.get('/users/:id', authMiddleware.authenticate, userController.getUserById);

// Update user details (accessible by the user themselves or master admin)
router.put('/users/:id', authMiddleware.authenticate, userController.updateUser);

// Delete a user (only accessible by master admin)
router.delete('/users/:id', authMiddleware.authenticate, roleMiddleware.isMasterAdmin, userController.deleteUser);

module.exports = router;