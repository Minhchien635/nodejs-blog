const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const Account = new Schema({
    username: { type: String, require: true, },
    password: {type: String, require: true, },
    phone: { type: String},
    address: { type: String, require: true, },
},{
    timestamps: true
});

Account.pre("save", function(next){
        this.password = bcrypt.hashSync(this.password, 10);;
        next();
})

module.exports = mongoose.model('Account', Account);