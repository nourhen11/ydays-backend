const Provider = require('../models/Provider')
const Product = require('../models/Product')
const Category = require('../models/Category')
const subcategory = require('../models/Subcategory')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

const register = (req,res,next) => {
    let provider= {company,siret,address,firstname,lastname,phone,email,password} = req.body
    Provider.create(provider,(err,result) =>{
        if(err){  res.status(500).send(err)}
       return  res.status(200).json({message:"succefly added"})
    })
   
}

const login = (req,res,next) => {
    Provider.findOne({ email: req.body.email },(err,provider)=>{
        if(err){res.status(500).json({err})}
        if (!provider) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
          }
          bcrypt.compare(req.body.password, provider.password,(err,valid)=>{
            if(err){res.status(500).json({err})}
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
              }
              res.status(200).json({
                token: jwt.sign({ providerId: provider._id },'RANDOM_TOKEN_SECRET', { expiresIn: '24h' })
             ,role:'provider' });
          })
    
    })    
}
const getProviderById = (req,res,next) => {
    Provider.findById(req.params.id,(err,result) => {
        res.status(200).json(result)
    })
}

const addProduct = (req,res,next) => {
   
    let product= {
        reference : req.body.reference,
        title : req.body.title,
        price : req.body.price,
        quantity : req.body.quantity,
        description : req.body.description,
        provider : req.body.provider,
        category : req.body.category,
        subcategory : req.body.subcategory,
        color : req.body.color,
        images : req.body.images
     }
     Product.create(product,(err,result) =>{
        idproduct = result._id
        console.log(idproduct)
        if(err){  res.status(500).send(err)}
        Provider.findOneAndUpdate({_id:req.body.provider},{$push:{products:idproduct}},(err,result)=>{
         if(err){  res.status(500).send(err)}
         Category.findOneAndUpdate({_id:req.body.category},{$push:{products:idproduct}},(err,result)=>{
            if(err){  res.status(500).send(err)}
            subcategory.findOneAndUpdate({_id:req.body.subcategory},{$push:{products:idproduct}},(err,result)=>{
                if(err){  res.status(500).send(err)}
               })
               return  res.status(200).json({message:"succefly added"})
           })
        })    
    })
}

const getProviderss =(req,res,next)=>{
    Provider.find((err,result) => {
        res.status(200).json(result)
    }) }
    const deleteProvider=(req,res,next)=>{
        Provider.deleteOne({_id:req.params.id},(err,result)=>{
            res.send(result)
        })
    }

module.exports = {
 
    register,
    login,
    addProduct,
    getProviderById,
    getProviderss,
    deleteProvider,
}