const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/users', UserController.getAllUser);
router.get('/users/:email', UserController.getOneUser);
router.post('/users', UserController.createUser);
router.put('/users/:email', UserController.updateUser);
router.put('/users/changepassword/:email', UserController.changePassword);

module.exports = router;
