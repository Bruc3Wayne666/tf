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
            type: String,
            default: 'data:image/png;base64,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'
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