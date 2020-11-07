const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    reference : {
        type : String,
        required:true
    },
    title :{
        type : String,
        required:true
    },
    price :{
        type : Number,
        required:true
    },
    quantity:{
        type : Number,
        required:true
    },
    color:{
        type : String,
        required:true
    },
    description:{
        type : String,
        required:true
    },
    images : [ { 
        type: String
    }],

    provider :  { type: Schema.Types.ObjectId, ref: 'Provider' ,required: true },
    category :  { type: Schema.Types.ObjectId, ref: 'Category' ,required: true   },
    subcategory :  { type: Schema.Types.ObjectId, ref: 'Subcategory' ,required: true   },
    

})
module.exports = mongoose.model('Product',ProjectSchema);