const express = require('express');
const workController = require('../controllers/workController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Assign work (only accessible by master admin)
router.post('/works', authMiddleware.authenticate, roleMiddleware.isMasterAdmin, workController.assignWork);

// Fetch works assigned to a user
router.get('/works/assigned-to/:id', authMiddleware.authenticate, workController.getWorksByAssignedTo);

// Update work status
router.put('/works/:id/status', authMiddleware.authenticate, workController.updateWorkStatus);

// Verify work (only accessible by admins)
router.post('/works/:id/verify', authMiddleware.authenticate, workController.verifyWork);

// Delete work (only accessible by master admin)
router.delete('/works/:id', authMiddleware.authenticate, roleMiddleware.isMasterAdmin, workController.deleteWork);

module.exports = router;