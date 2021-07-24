const accountService = require('../services/AccountService')

class AccountController{
    async register(req, res, next){
        accountService.register(req, res, next)
    }

    async login(req, res, next){
        accountService.login(req, res, next)
    }

    async private(req, res, next){  
        accountService.private(req, res, next)
    }

}
module.exports = new AccountController();