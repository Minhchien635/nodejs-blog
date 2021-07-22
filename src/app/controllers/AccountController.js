const Account = require('../models/Account');
const { mongooseToObject } = require('../../util/mongoose');
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const verifyAccount = require('../security/VerifyAccount');
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