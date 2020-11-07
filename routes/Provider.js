const express = require('express');
const router = express.Router();
const Provider = require('../controllers/Provider')
router.delete('/:id',Provider.deleteProvider);

router.get('/allproviders',Provider.getProviderss);
router.get('/:id',Provider.getProviderById)
router.post('/register',Provider.register);
router.post('/login',Provider.login);

router.post('/products',Provider.addProduct);


module.exports = router;

