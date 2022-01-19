export const validate = ({fullName, username, email, password, confirmPassword}) => {
    const err = {}

    if (!fullName) {
        err.fullName = 'Add your full name'
    } else if (fullName.length > 40) {
        err.fullName = 'Your name is too long'
    }

    if (!username) {
        err.username = 'Add your nickname'
    } else if (username.replace(/ /g, '_').length > 40) {
        err.username = 'Your nickname is too long'
    }

    if (!email) {
        err.email = 'Add your Email'
    } else if (!validateEmail(email)) {
        err.email = 'Should be an Email'
    }

    if (!password) {
        err.password = 'Add your password'
    } else if (password.length < 6) {
        err.password = 'Your password is too short'
    }

    if (password !== confirmPassword) {
        err.confirmPassword = 'Write correct password'
    }

    return {
        errMessage: err,
        errLength: Object.keys(err).length
    }
}

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}