const jwt = require('jsonwebtoken')
const blacklistTokenModel = require('../models/blacklist.model');


async function verifyUser(req,res,next){

    const token = req.cookies.token;
    
    if(!token){
        return res.status(401).json({
            message: "no token found."
        })
    }
    const isBlacklist = await blacklistTokenModel.findOne({
        token
    })

    if(isBlacklist){
        res.clearCookie('token');
        return res.status(401).json({
            message: "This token is invalid.Please login again"
        })
    }


    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();

    }
    catch(err){
        return res.status(401).json({
            message: 'invalid token'
        })
    }


}


module.exports = {verifyUser};