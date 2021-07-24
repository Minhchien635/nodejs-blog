const Account = require('../models/Account');
const { mongooseToObject } = require('../../util/mongoose');
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const authentication = require('../security/Authentication');

class AccountService{
    async register(req, res, next){
        if(req.body.username == "" || req.body.password == ""){
            return res.json('Register failed!')
        }
        const accountExisted = await Account.findOne({username: req.body.username});

        if(accountExisted){
            res.json(accountExisted.username + ' existed');
        }else{
             await Account.create({
                username: req.body.username,
                password: req.body.password,
                phone: req.body.phone,  
                address: req.body.address,
            })
            .then(data=>{
                return res.json(authentication.getToken(data));
            })
            .catch(err=>{
                return res.json(err);
            })
        }
    }

    async login(req, res, next){
        let password = req.body.password;

        Account.findOne({username: req.body.username})
        .then(data => {
            if(data){
                if(bcrypt.compareSync(String(password), String(data.password))){
                    return res.json(authentication.getToken(data))
                }else{
                    return res.json('Password incorrect')
                }
            }else{
                return res.json('User not exist')
            }
        })
    }

    async private(req, res, next){
        console.log((await authentication.verify(req,res, next)).username)
    }

}
module.exports = new AccountService();