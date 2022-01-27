const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const e = require("express");
const jwt = require("jsonwebtoken");

class authController {
    async register(req, res) {
        try {
            const {username, fullName, email, password, gender} = req.body
            const newUserName = `@${username.toLowerCase().replace(/ /g, '')}`

            const userName = await User.findOne({username: newUserName})
            if (userName) return res.status(400).json({msg: 'This username already exists'})

            const userEmail = await User.findOne({email})
            if (userEmail) return res.status(400).json({msg: 'This email already exists'})

            if (password.length < 6) return res.status(400).json({msg: 'Password must be 6 symbols and more'})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = new User({
                fullName,
                username: newUserName,
                email,
                password: passwordHash,
                gender
            })

            const accessToken = createAccessToken({id: newUser._id})
            const updateToken = createUpdateToken({id: newUser._id})

            res.cookie('updatetoken', updateToken, {
                httpOnly: true,
                path: '/api/auth.js/upd_token',
                maxAge: 60 * 60 * 24 * 30 * 1000
            })

            await newUser.save()

            res.status(200).json({
                msg: 'Registered successfully!',
                accessToken,
                user: {
                    ...newUser._doc,
                    password: ''
                }
            })
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
                .populate('followers following friends blockedUsers', '-password')
            console.log(user)
            if (!user) return res.status(400).json({msg: 'This user doesn\'t exist'})

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({msg: 'Wrong password'})

            const accessToken = createAccessToken({id: user._id})
            const updateToken = createUpdateToken({id: user._id})

            res.cookie('updatetoken', updateToken, {
                httpOnly: true,
                path: '/api/auth.js/upd_token',
                maxAge: 60 * 60 * 24 * 30 * 1000
            })

            res.status(200).json({
                msg: 'Signed in successfully!',
                accessToken,
                user: {
                    ...user._doc,
                    password: ''
                }
            })
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie('updatetoken', {
                path: '/api/auth.js/upd_token'
            })

            return res.json({msg: 'Signed out'})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    }

    async getAccessToken(req, res) {
        try {
            const updToken = req.cookies.updatetoken
            if (!updToken) return res.status(400).json({msg: 'You have to Sign in'})

            jwt.verify(updToken, process.env.UPDATE_TOKEN, async (err, result) => {
                if (err) return res.status(400).json({msg: 'You have to Sign in'})

                const user = await User.findById(result.id).select('-password')
                    .populate('followers following friends blockedUsers', '-password')

                if (!user) return res.status(400).json({msg: 'This user doesn\'t exist'})

                const accessToken = createAccessToken({id: result.id})
                const updateToken = createUpdateToken({id: result.id})

                res.cookie('updatetoken', updateToken, {
                    httpOnly: true,
                    path: '/api/auth.js/upd_token',
                    maxAge: 60 * 60 * 24 * 30 * 1000
                })

                res.json({accessToken, user})
            })
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    }
}


const createAccessToken = payload => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN, {expiresIn: '1d'})
}

const createUpdateToken = payload => {
    return jwt.sign(payload, process.env.UPDATE_TOKEN, {expiresIn: '30d'})
}


module.exports = new authController()