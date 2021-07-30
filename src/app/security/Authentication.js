const account = require('../models/Account');
const jwt = require('jsonwebtoken');
class Authentication{
    async verify(req, res, next){
        try {
            if(!(req.cookies.token)){
                return res.json('Access is not allowed')
            }
            var token = req.cookies.token;
            var result = jwt.verify(token,'mk');
            const user = await account.findById(result._id);
            if(user){
                return user
            }else{
                return res.redirect('/')
            }
        } catch (error) {
            return res.json(error)
        }
    };

    getToken(account){
        var token = jwt.sign({
            _id: account._id
        }, 'mk')
        return {
            message: 'Success',
            username: account.username,
            token: token,
        }
    }
}
module.exports = new Authentication();