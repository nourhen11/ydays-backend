const Category = require('../models/Category')
const Subcategory = require('../models/Subcategory')
const Color = require('../models/Color')

const addCategory = (req,res,next) => {
    let category={
        "name" : req.body.name
    }
    Category.create(category,(err,result) =>{
        if(err){  res.status(500).send(err)}
       return  res.status(200).json({message:"succefully saved"})
    })
}

const addSubcategory = (req,res,next) => {
    let subcategory={
        "name" : req.body.name,
        'category':req.body.category
    }
    Subcategory.create(subcategory,(err,result) =>{
        if(err){  res.status(500).send(err)}
        Category.findOneAndUpdate({_id:req.body.category},{$push:{sub_categories:result._id}},(err,result)=>{
            if(err){  res.status(500).send(err)}
            return  res.status(200).json({message:"succefully saved"})
        })
    })
}



module.exports = {
    addCategory,
    addSubcategory,

} 
