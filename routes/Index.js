const express = require('express');
const router = express.Router();
const Index = require('../controllers/Index')
const multer = require("multer");
const path = require("path");
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })

var upload = multer({ storage: storage });

router.post('/file', upload.single('file'), Index.addFile)
router.post('/multipleFiles', upload.array('files'), Index.addFiles)
router.post('/register',Index.register)
router.post('/login',Index.login)

router.get('/products',Index.getProducts)
router.get('/products/category/:id_category',Index.getProductsByCategory)
router.get('/categories',Index.getCategories)
router.get('/subcategories/:id',Index.getSubcategories)
router.get('/providers',Index.getProviders)
router.get('/products/:id',Index.getProductById)
router.get('/image/:name', upload.single('user_image'),async (req, res) => {
    console.log(__dirname)
    res.sendFile('C:\\Users\\nourh\\Documents\\GitHub\\ydaysProject\\backOffice\\uploads\\' + req.params.name)
  })
module.exports = router;