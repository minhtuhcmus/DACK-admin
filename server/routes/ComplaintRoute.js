const express = require('express');
const router = express.Router();
const ComplaintController = require('../controllers/ComplaintController');

router.get('/', ComplaintController.getAllComplaint);
router.get('/:complaintID', ComplaintController.getOneComplaint);
router.get('/chat/:complaintID', ComplaintController.getChatHistory);
router.put('/:complaintID', ComplaintController.updateComplaint);

module.exports = router;
