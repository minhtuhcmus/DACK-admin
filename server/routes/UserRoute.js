const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/users', UserController.getAllUser);
router.get('/users/:username', UserController.getOneUser);
router.post('/users', UserController.createUser);
router.put('/users/:username', UserController.updateUser);
router.put('/users/changepassword/:username', UserController.changePassword);

module.exports = router;
