const Router = require('express')
const router = new Router()
const auth = require('../middleware/auth')
const userController = require('../controllers/userController')

router.get('/search', auth, userController.searchUser)
router.get('/user/:id', auth, userController.getUser)


module.exports = router