const express = require('express');
const router = express.Router();
const SkillController = require('../controllers/SkillController');

router.get('/', SkillController.getAllSkill);
router.get('/:skillID', SkillController.getOneSkill);
router.post('/', SkillController.createSkill);
router.put('/:skillID', SkillController.updateSkill);
router.delete('/:skillID', SkillController.deleteSkill);

module.exports = router;
