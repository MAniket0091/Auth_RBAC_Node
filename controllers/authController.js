const {findUserByEmailOrUsername,createUser} = require('../services/authServices');
const {hashPassword,comparePassword} = require('../utils/hashPassword');
const jwt = require('jsonwebtoken');
const {generateTokens} = require('../utils/authHandler');
const ErrorHandler = require('../utils/errorHandler');
const {transporter} = require('../utils/mailHandler');

// Register Controller :
exports.registerController =  async(req,res,next) => {
	const {username, password, email} = req.body;
    try{
        const userExists = await findUserByEmailOrUsername(email,username);
        if(userExists){
            throw new ErrorHandler('User with Email or Username already exists',401);
        }
        // hashing password with BCrypt
        const hashedPassword = await hashPassword(password);
        // saving User :
        const savedData = await createUser({username,password:hashedPassword,email});
        // send Verification Mail :
        let OTP = 12345;
        const verificationLink = `http://localhost:5173/verify-mail?userid=${savedData._id}`; // frontend URL
        const mailOptions = {
            from:process.env.EMAIL_USER,
            subject:'Welcome to Ozone Holdings',
            text: `Activate user id : ${savedData.email} here`,
            html:`<b>Please verify email using the OTP : ${OTP} and Click here :</b> <a href = "${verificationLink}">Click Me</a>`
        }
        await transporter.sendMail(mailOptions);
        res.status(201).json({
            error:false,
            data: savedData
        })
    }catch(error){
        next(error);
        console.log(error, 'from error');
    }
	//res.send(data);
}


// Login Controller :
exports.loginController =  async(req,res,next) => {
	const {username, password, email} = req.body;
    try{
        const user = await findUserByEmailOrUsername(email,password);
        if(!user){
            throw new ErrorHandler('User with Email or Username does not exists',401)
        }
        // comparing hashed password with BCrypt
        const correctPassword = await comparePassword(password, user.password);
        if(!correctPassword){
            throw new ErrorHandler('Password does not match',401)
        }

        // Get the token :
        const {token, refreshToken} = await generateTokens(user);
        user.refreshToken = refreshToken;
        await user.save();

        res.cookie('accessToken',token,{
            httpOnly: true,
            secure: true,
        })

        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            secure:true,
        })


        console.log(user, correctPassword, token, refreshToken);
        return res.status(201).json({
            error:false,
            data:user,
            token:token,
            refreshToken:refreshToken
        })

    }catch(error){
        next(error);
        console.log(error, 'from error');
    }
	//res.send(data);
}
