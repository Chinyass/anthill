const ApiError = require('../error/ApiError')
require('dotenv').config()
const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, name, surname, patronymic) => {

    return jwt.sign( {id, email, name, surname, patronymic }, process.env.JWT_SECRET, {expiresIn: '24h'} )

}

class AuthController{

    async registration(req,res,next){

        let { name, surname, patronymic, email, password} = req.body

        if ( !email || !password )
          return next(ApiError.badRequest('Некорректные данные'))
        
        const candidate = await User.findOne({ email })

        if (candidate){
            return next(ApiError.badRequest('Пользователь уже существует'))
        }
        
        const hashPassword = await bcrypt.hash(password,5) 
        const user = await User.create( {name, surname, patronymic, email, password: hashPassword} )
        const token = generateJwt(user.id,user.email,user.name, user.surname, user.patronymic)

        return res.json({token})

    }

    async login(req,res,next){

        const {Email,Password} = req.body

        const user = await User.findOne({where:{Email}})
    
        if (!user){
            //return next(ApiError.badRequest('Пользователь не найдет'))
            res.status(401).send('Неверный пользователь или пароль')
        }

        const comparePassword = bcrypt.compareSync(Password,user.Password)
        
        if(!comparePassword){
            //return next(ApiError.forbidden('Неверный пароль'))
            res.status(401).send({msg: 'Неверный пользователь или пароль'})
        }
        console.log(user)
        const token = generateJwt(user.id,user.email,user.name, user.surname, user.patronymic)

        return res.json({token})

    }

    async check(req,res){
        const {user} = req
        console.log(user.Name)
        const token = generateJwt(user.id,user.email,user.name, user.surname, user.patronymic)
        return res.json({token})
    }
}

module.exports = new AuthController()