const jwt = require('jsonwebtoken')


async function verifyUser(req,res,next){
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"Unauthorized: No token provided"});
        }

        const decoded = jwt.verify(token,process.env.JWT_ACCESS_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        return res.status(401).json({message:"Unauthorized: Invalid token"});
    }
}


module.exports = {verifyUser};