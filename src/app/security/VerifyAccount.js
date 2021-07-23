const Account = require('../models/Account');
const jwt = require('jsonwebtoken');

module.exports = async (req) => {
    try {
        var token = req.cookies.token;
        var result = jwt.verify(token,'mk');
        const user = await Account.findById(result._id);
        if(user){
            return {
                user: user,
                isExisted: true,
            };
        }else{
            return {
                user: {},
                isExisted: false,
            }
        }
    } catch (error) {
        return res.json(error)
       //return res.redirect('back');
    }
};