const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-type-email');
const bcrypt = require('bcrypt-nodejs')

const ProviderSchema = new Schema({
    company : {
        type: String,
        required : true
    },
    siret : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : [true,(Error + 'adresse')]
    },
    firstname : {
        type : String,
        required : [true,(Error + 'npm')]
    },
    lastname : {
        type : String,
        required : [true,(Error + 'prenom')]
    },
    phone : {
        type : String,
        required : [true,(Error + 'téléphone')]
    },
    email :{ 
        type : mongoose.SchemaTypes.Email,
        required : [true,(Error + 'email')],
        unique: true
    },
    password : {
        type : String,
        required : true
    },
    products : [{type: Schema.Types.ObjectId, ref: 'Product'}]
})

ProviderSchema.pre('save', function () {
    if (this.isNew || this.isModified('password')) {
     this.password = bcrypt.hashSync(this.password);
    }
});

module.exports = mongoose.model('Provider',ProviderSchema);