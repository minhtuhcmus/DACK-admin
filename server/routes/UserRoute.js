const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.getAllUser);
router.get('/:email', UserController.getOneUser);
router.put('/:email', UserController.updateUser);

module.exports = router;
