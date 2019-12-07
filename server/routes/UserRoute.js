const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.getAllUser);
router.get('/:email', UserController.getOneUser);
router.post('/', UserController.createUser);
router.put('/:email', UserController.updateUser);
router.put('/changepassword/:email', UserController.changePassword);

module.exports = router;
