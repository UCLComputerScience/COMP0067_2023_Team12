var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

const authConfig = require("../config/authConfig.js");

const tokenModel = require("../models/tokenModel.js");
const userModel = require("../models/userModel.js");
const sendEmail = require("../services/sendEmail");

// The fucntion SendPasswordLink is adapated from https://github.com/mehulmpt/node-auth-youtube
module.exports.SendPasswordLink = (req, res) => {
    if (!req.body.user) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    userModel.findOne({ user: req.body.user })
    .then(data => {
    if (!data)
        res.status(404).send({ message: "Not found user with username " + req.body.user});
    else
        tokenModel.findOne({ user: req.body.user })
        .then(data => {
        if (!data) {
            const token = new tokenModel({
                user: req.body.user,
                token: jwt.sign({id: req.body.user}, authConfig.secret, {expiresIn: 86400})
            });
            
            // Save the User in the database
            token
                .save()
                .then(data => {
                res.send(data);

                var TOKEN = token.token;

                const url = `${process.env.BASE_URL}#/resetpassword/${req.body.user}/${TOKEN}/`;

                sendEmail(req.body.user, "Password Reset", url); 
                res.status(200).send({ message: "Password reset link sent to your email account"});

                })
                .catch(err => {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the Token."
                });
                });            
        } else {  
            tokenModel.findByIdAndRemove(data._id, { useFindAndModify: false })
                .then(data => {
                if (!data) {
                    res.status(404).send({
                    message: `Cannot delete Token with id=${id}.`
                    });
                    return;
                } else {
                    const newToken = new tokenModel({
                        user: req.body.user,
                        token: jwt.sign({id: req.body.user}, authConfig.secret, {expiresIn: 86400})
                    });
                    
                    // Save the User in the database
                    newToken
                        .save()
                        .then(data => {
                            var TOKEN = newToken.token;

                            const url = `${process.env.BASE_URL}#/resetpassword/${req.body.user}/${TOKEN}/`;
            
                            sendEmail(req.body.user, "Password Reset", url); 
                            res.status(200).send({ message: "Password reset link sent to your email account"});
                        })
                        .catch(err => {
                        res.status(500).send({
                            message:
                            err.message || "Some error occurred while creating the Token."
                        });
                        });
                }
                })
                .catch(err => {
                res.status(500).send({
                    message: "Could not delete Token with id=" + id
                });
                return;
                });
        }        
    })
})
};



module.exports.VerifyLink = (req, res) => {

    userModel.findOne({ user: req.body.user })
    .then(data => {
        if (!data)
            return res.status(404).send({ message: "Invalid Link"});
        else
        tokenModel.findOne({ user: req.body.user })
        .then(data => {
        if (!data) {
            return res.status(404).send({ message: "Invalid Link"});
        }
        else
            if (data.token == req.body.token)
                return res.status(200).send({ message: "Valid URL"});
            else
                return res.status(408).send({ message: "Invalid Link"});
        });

    })
    .catch(err => {
        return res
            .status(500)
            .send({ message: "Internal Server Error" });
        });
}
