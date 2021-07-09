const Account = require('../models/Account');
const { mongooseToObject } = require('../../util/mongoose');
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const verifyAccount = require('../security/VerifyAccount');

class AccountController{
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
                var token = jwt.sign({
                    _id: data._id
                }, 'mk')
                return res.json({
                    message: 'Success',
                    username: data.username,
                    token: token,
                })
            })
            .catch(err=>{
                return res.json(err);
            })
        }
    }

    async login(req, res, next){
        var username = req.body.username;
        var password = req.body.password;

        Account.findOne({username: req.body.username})
        .then(data => {
            if(data){
                if(bcrypt.compareSync(String(password), String(data.password))){
                    var token = jwt.sign({
                        _id: data._id
                    }, 'mk')
                    return res.json({
                        message: 'Success',
                        username: data.username,
                        token: token,
                    })
                }else{
                    return res.json('Login failed!')
                }
            }else{
                return res.json('Login failed!')
            }
        })
    }

    async private(req, res, next){
      
        if(verifyAccount.verify(req)){
            console.log('true')
        }else{
            console.log('false')

        }
    }

}
module.exports = new AccountController();