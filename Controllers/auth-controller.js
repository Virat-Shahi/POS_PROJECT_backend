const createError = require('../Utils/createError')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../config/prisma')
exports.register = async (req, res, next) => {
    try {
        const { email, password, confirmPassword } = req.body

        if (!email) {
            createError(400, 'Email is required')
        }
        if (!email.includes('@')) {
            createError(400, 'Email is not valid')
        }
        if (password !== confirmPassword) {
            createError(400, 'Password does not match')
        }
        if (!password) {
            createError(400, 'Password is required')
        }

        // Check Email in DB
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (user) {
            createError(400, 'Email already in use')
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create User
        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword
            }
        })

        // Generate Token
        res.json({ newUser, message: 'Register Success' })
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email) {
            createError(400, 'Email is required')
        }
        if (!password) {
            createError(400, 'Password is required')
        }

        // Check Email in DB
        const isUserExist = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (!isUserExist) {
            createError(400, 'Email not found')
        }

        // Compare Password
        const isPasswordMatch = await bcrypt.compare(password, isUserExist.password)

        if (!isPasswordMatch) {
            createError(400, 'Email or Password is invalid')
        }

        // Create Payload
        const payload = {
            user: {
                id: isUserExist.id,
                email: isUserExist.email
            }
        }
        console.log(payload)

        // Generate Token
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '30d'
        })

        // Send Token

        res.json({ token, user: payload.user})
    } catch (error) {
        next(error)
    }
}