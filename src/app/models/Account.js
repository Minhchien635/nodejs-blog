const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    username: { type: String, require: true, },
    password: {type: String, require: true, },
    phone: { type: String},
    address: { type: String, require: true, },
},{
    timestamps: true
});

module.exports = mongoose.model('Account', Account);