const User = require('../models/User')
const Product = require('../models/Product')
const Category = require('../models/Category')
const Provider = require('../models/Provider')
const Subcategory = require('../models/Subcategory')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

const register = (req,res,next) =>{
  const user=  { firstname, lastname, email, password } = req.body;
  User.create(user,(err,result) =>{
    if(err){  res.status(500).send(err)}
   return  res.status(200).json({message:"succefly added"})
  })
}
const login = (req,res,next) => {
  User.findOne({ email: req.body.email },(err,user)=>{
    if(err){res.status(500).json({err})}
    if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password,(err,valid)=>{
        if(err){res.status(500).json({err})}
        if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            token: jwt.sign({ userId: user._id },'RANDOM_TOKEN_SECRET', { expiresIn: '24h' })
         ,role:'user' });
      })

})    
}
const addFile =(req, res, next) => {
    const file = req.file;
    console.log(file);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file.filename);
  }

const addFiles = (req, res, next) => {
    const files = req.files;
    const images = []
    console.log(files);
    if (!files) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }

    files.forEach(function(file){
      images.push(file.filename);
    });
   return  res.status(200).send(images)
  }

const getProducts = (req,res,next) => {
  Product.find().populate({ path: 'category', select: 'name' }).exec((err,result) => {
    res.status(200).send(result)
  })
}
const getProductById = (req,res,next) => {
  Product.findOne({_id:req.params.id}).populate({ path: 'category', select: 'name' }).populate({ path: 'subcategory', select: 'name' }).exec((err,result) => {
    res.status(200).send(result)
  })
}

const getCategories = (req,res,next) => {
  Category.find().select('name').select('sub_categories').populate({ path: 'sub_categories', select: 'name' }).exec((err,result) => {
    res.status(200).send(result)
  })
}
const getSubcategories = (req,res,next) =>{
  console.log(req.params.id)
  Category.findOne({_id:req.params.id}).select('sub_categories').populate({'path':'sub_categories','select':'name'}).exec((err,result)=>{
    res.status(200).json(result.sub_categories)
  })
}
const getProviders = (req,res,next) => {
  Provider.find().select('company').exec((err,result) => {
    res.status(200).send(result)
  })
}
const getProductsByCategory =(req,res,next)=>{
  console.log(req.params.id_category)
  Product.find({category:req.params.id_category},(err,result)=>{
    res.status(200).send(result)
  })

}
module.exports = {
    login,
    register,
    addFile,
    addFiles,
    getProducts,
    getProductById,
    getCategories,
    getProviders,
    getSubcategories,
    getProductsByCategory

} 