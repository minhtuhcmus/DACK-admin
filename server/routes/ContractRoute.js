const express = require('express');
const router = express.Router();
const ContractController = require('../controllers/ContractController');

router.get('/', ContractController.getAllContract);
router.get('/:contractID', ContractController.getOneContract);
router.put('/:contractID', ContractController.updateContract);

module.exports = router;
