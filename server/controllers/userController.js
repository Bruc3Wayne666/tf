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
                .populate('followers following', '-password')
                .select('-password')
            if (!user) return res.status(400).json({msg: 'User doesn\'t exist'})
            res.json({user})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

    async editUser(req, res){
        try {
            const {_id} = req.user
            const {profileImage, fullName, number, location, about, socialNetwork, gender} = req.body
            if (!fullName) return res.status(400).json({msg: 'Add your full name'})
            await User.findOneAndUpdate({_id: _id}, {
                profileImage, fullName, number, location, about, socialNetwork, gender
            })

            res.json({msg: 'User has been updated!'})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

    async follow(req, res){
        try {
            const {id} = req.params
            const user = await User.find({_id: id, followers: req.user._id})
            if (user.length > 0) return res.status(500).json({msg: 'You\'re already following this user'})
            const newUser = await User.findOneAndUpdate({_id: id}, {
                $push: {followers: req.user._id}
            }, {new: true}).populate('followers following', '-password')
            await User.findOneAndUpdate({_id: req.user._id}, {
                $push: {following: id}
            }, {new: true})
            res.json({newUser})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

    async unfollow(req, res){
        try {
            const {id} = req.params
            const newUser = await User.findOneAndUpdate({_id: id}, {
                $pull: {followers: req.user._id}
            }, {new: true}).populate('followers following', '-password')
            await User.findOneAndUpdate({_id: req.user._id}, {
                $pull: {following: id}
            }, {new: true})
            res.json({newUser})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = new userController()