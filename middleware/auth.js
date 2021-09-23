const jwt = require('jsonwebtoken')
const { User }  = require('../models')
require('dotenv').config()

module.exports = async function(req,res,next){
    if (req.method === 'OPTION'){
        next()
    }

    try{
        const token = req.headers.authorization.split(' ')[1]
      
        if (!token){
            req.session.redirectTo = '/api/user/registartion';
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
     
        const user = await User.findOne({where:{Email:decoded.Email}})
        
        if (!user){
            throw true
        }
        
        req.user = user
        next()

    }
    catch(e){
        res.status(401).json({message:' не авторизован'})
    }
}