const express = require('express');
const departmentController = require('../controllers/departmentController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Fetch all departments
router.get('/departments', departmentController.getAllDepartments);

// Fetch a department by ID
router.get('/departments/:id', departmentController.getDepartmentById);

// Create a new department (only accessible by master admin)
router.post('/departments', authMiddleware.authenticate, roleMiddleware.isMasterAdmin, departmentController.createDepartment);

// Update a department (only accessible by master admin)
router.put('/departments/:id', authMiddleware.authenticate, roleMiddleware.isMasterAdmin, departmentController.updateDepartment);

// Delete a department (only accessible by master admin)
router.delete('/departments/:id', authMiddleware.authenticate, roleMiddleware.isMasterAdmin, departmentController.deleteDepartment);

module.exports = router;