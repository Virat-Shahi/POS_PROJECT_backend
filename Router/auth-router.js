const express = require('express')
const router = express.Router()
const authController = require('../Controllers/auth-controller')
const {registerValidator, loginValidator} = require('../Middlewares/validator')
// router.post('/register', authController.register)
// router.post('/login', authController.login)


router.post('/register', registerValidator, authController.register)
router.post('/login', loginValidator, authController.login)



module.exports = router