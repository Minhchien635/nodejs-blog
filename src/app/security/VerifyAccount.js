const Account = require('../models/Account');
const jwt = require('jsonwebtoken');
class VerifyAccount{
    async verify(req){
        try {
            var token = req.cookies.token;
            var result = jwt.verify(token,'mk');
            const user = await Account.findById(result._id);
            if(user){
                return true;
            }else{
                return false;
            }
        } catch (error) {
            return res.json(error)
           //return res.redirect('back');
        }
    }
}

module.exports = new VerifyAccount();