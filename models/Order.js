const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-type-email');

const OrderSchema = new Schema({
   
    date : {
        type : date,
        required : true
    },
    price : {
        type : Number,
        required : true
    },

    products :   [{type: Schema.Types.ObjectId, ref: 'Product'}],
    user :       {type: Schema.Types.ObjectId, ref: 'User'}
})
module.exports = mongoose.model('Order',OrderSchema);