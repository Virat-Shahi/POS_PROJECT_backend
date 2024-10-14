const prisma = require('../config/prisma')


exports.createCategory = async (req, res, next) => {
    try {
        const { name } = req.body
        const category = await prisma.category.create({
            data: {
                name
            }
        })
        res.json(category)
    } catch (error) {
        next(error)
    }
}

exports.getCategories = async (req, res, next) => {
    try {
        const category = await prisma.category.findMany()
        res.json(category)
    } catch (error) {
        next(error)
    }
}

exports.getCategory = async (req, res, next) => {
    try {
        const { id } = req.params
        const category = await prisma.category.findFirst({
            where: {
                id : Number(id)
            }
        })
        res.json(category)
    } catch (error) {
        next(error)
    }
}

exports.updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params
        const { name } = req.body
        const category = await prisma.category.update({
            where: {
                id : Number(id)
            },
            data: {
                name : name
            }
        })
        res.json(category)
    } catch (error) {
        next(error)    
    }
}
exports.deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params
        const category = await prisma.category.delete({
            where: {
                id : Number(id)
            }
        })
        res.json(category)
    } catch (error) {
        next(error)
    }
}