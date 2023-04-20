var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

const authConfig = require("../config/authConfig.js");

const tokenModel = require("../models/tokenModel.js");
const userModel = require("../models/userModel.js");
const sendEmail = require("../services/sendEmail");


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

                // const url = `http://localhost:3000/resetpassword/${req.body.user}/${TOKEN}/`;
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
            // var token = jwt.sign({id: req.body.user}, authConfig.secret, {expiresIn: 86400}).save();
            
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
                    
                    // console.log(newToken)
                    // Save the User in the database
                    newToken
                        .save()
                        .then(data => {
                            var TOKEN = newToken.token;

                            // const url = `http://localhost:3000/resetpassword/${req.body.user}/${TOKEN}/`;
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





// verify password reset link
// router.get("/:id/:token", async (req, res) => {
// 	try {
// 		const user = await User.findOne({ _id: req.params.id });
// 		if (!user) return res.status(400).send({ message: "Invalid link" });

// 		const token = await Token.findOne({
// 			userId: user._id,
// 			token: req.params.token,
// 		});
// 		if (!token) return res.status(400).send({ message: "Invalid link" });

// 		res.status(200).send("Valid Url");
// 	} catch (error) {
// 		res.status(500).send({ message: "Internal Server Error" });
// 	}
// });

// //  set new password
// router.post("/:id/:token", async (req, res) => {
// 	try {
// 		const passwordSchema = Joi.object({
// 			password: passwordComplexity().required().label("Password"),
// 		});
// 		const { error } = passwordSchema.validate(req.body);
// 		if (error)
// 			return res.status(400).send({ message: error.details[0].message });

// 		const user = await User.findOne({ _id: req.params.id });
// 		if (!user) return res.status(400).send({ message: "Invalid link" });

// 		const token = await Token.findOne({
// 			userId: user._id,
// 			token: req.params.token,
// 		});
// 		if (!token) return res.status(400).send({ message: "Invalid link" });

// 		if (!user.verified) user.verified = true;

// 		const salt = await bcrypt.genSalt(Number(process.env.SALT));
// 		const hashPassword = await bcrypt.hash(req.body.password, salt);

// 		user.password = hashPassword;
// 		await user.save();
// 		await token.remove();

// 		res.status(200).send({ message: "Password reset successfully" });
// 	} catch (error) {
// 		res.status(500).send({ message: "Internal Server Error" });
// 	}
// });
