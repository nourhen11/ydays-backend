const express = require('express');
const router = express.Router();
const Admin = require('../controllers/Admin')

router.post('/category',Admin.addCategory);
router.post('/subcategory',Admin.addSubcategory);


module.exports = router;