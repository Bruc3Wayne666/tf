const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
        username: {
            type: String,
            required: true,
            trim: true,
            maxLength: 40,
            unique: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            maxLength: 100
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        profileImage: {
            type: String
        },
        role: {
            type: String,
            default: 'user'
        },
        gender: {
            type: String,
            default: 'male'
        },
        number: {
            type: String,
            default: ''
        },
        location: {
            type: String,
            default: ''
        },
        about: {
            type: String,
            maxLength: 400,
            default: ''
        },
        socialNetwork: {
            type: String,
            default: ''
        },
        followers: [{type: mongoose.Types.ObjectId, ref: 'User'}],
        following: [{type: mongoose.Types.ObjectId, ref: 'User'}],
        friends: [{type: mongoose.Types.ObjectId, ref: 'User'}],
        blockedUsers: [{type: mongoose.Types.ObjectId, ref: 'User'}]
    },
    {
        timestamps: true
    })

module.exports = mongoose.model('User', userSchema)