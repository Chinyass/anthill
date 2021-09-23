const User = require('../models/User')

class UsersController{
    async getAll(req,res){
        const users = await User.find({})
        return res.json(users)
    }

    async getOne(req,res,next){
        const {id} = req.params
        return res.json(id)
    }

    async delete(req,res,next){
        const {id} = req.params
        const user = await User.destroy( { where: {id} } )
        return res.status(200).json(user)
    }

    async deleteAll(req,res,next){
        const user = await User.destroy({
            where: {}
        })
        return res.status(200).json(user)
    }
}

module.exports = new UsersController()