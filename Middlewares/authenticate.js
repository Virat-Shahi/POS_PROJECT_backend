const prisma = require('../config/prisma')
const createError = require('../Utils/createError')
const jwt = require('jsonwebtoken')

const authenticate = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization

        if(!authorization || !authorization.startsWith('Bearer ')) {
            return createError(401, 'Unauthorized')
        }

        const token = authorization.split(' ')[1];
        if(!token){
            return createError(401, 'Unauthorized')
        }

        const jwtPayload = jwt.verify(token, process.env.JWT_SECRET);

        const user  = await prisma.user.findFirst({
            where: {
                id: jwtPayload.id
            }
        })

        if(!user) {
            return createError(401, 'Unauthorized')
        }

        req.user = user
        next()
    } catch (error) {
        next(error)
    }

}

module.exports = authenticate