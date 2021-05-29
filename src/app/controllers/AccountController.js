const Account = require('../models/Account');
const { mongooseToObject } = require('../../util/mongoose');
const jwt = require('jsonwebtoken')
const express = require('express')


class AccountController{
    async register(req, res, next){
        
        const accountExisted = await Account.findOne({username: req.body.username});

        if(accountExisted){
            res.json(accountExisted.username + ' existed');
        }else{
            Account.create({
                username: req.body.username,
                password: req.body.password,
                phone: req.body.phone,  
                address: req.body.address,
            })
            .then(data=>{
                res.json(data);
            })
            .catch(err=>{
                res.json(err);
            })
        }
    }

    login(req, res, next){
        var username = req.body.username;
        var password = req.body.password;

        Account.findOne({
            username: username,
            password: password,
        })
        .then(data =>{
            if(data){
                var token = jwt.sign({
                    _id: data._id
                }, 'mk')
                return res.json({
                    message: 'Success',
                    username: username,
                    token: token,
                })
            }else{
                return res.json('Login failed!')
            }
        })
        .catch(err =>{
            res.status(500).json('Sever error!');
        })
    }

   async private(req, res, next){
        try {
            var token = req.cookies.token;
            var ketqua = jwt.verify(token,'mk');
            const user = await Account.findById(ketqua._id);
            if(user){
                res.json('wellcome ' + user.username);
            }
        } catch (error) {
            return res.redirect('back');
        }
    }
}
 module.exports = new AccountController();