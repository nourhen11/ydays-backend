const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({

   name :{
        type : String,
        required:true
    },

    sub_categories :  [{ type: Schema.Types.ObjectId, ref: 'Subcategory'}],
    products :  [{ type: Schema.Types.ObjectId, ref: 'Product'}],
})
module.exports = mongoose.model('Category',CategorySchema);