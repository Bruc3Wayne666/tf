const User = require('../models/userModel')

class userController {
    async searchUser(req, res){
        try {
            const users = await User.find({username: {$regex: req.query.username}})
                .limit(10).select('fullName username profileImage')

            res.json({users})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

    async getUser(req, res){
        try {
            const {id} = req.params
            const user = await User.findById(id)
                .select('-password')
            if (!user) return res.status(400).json({msg: 'User doesn\'t exist'})

            res.json({user})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = new userController()