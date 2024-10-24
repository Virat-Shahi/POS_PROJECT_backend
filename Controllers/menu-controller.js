
const prisma = require('../config/prisma')

exports.createMenu = async (req, res, next) => {
    try {
        const { name,description,price,imageUrl,categoryId } = req.body
        const menuItem = await prisma.menuItem.create({
            data: {
                name,
                description,
                price,
                imageUrl,
                categoryId
            },
            include : {
                category : true
            }
        })
        res.status(201).json(menuItem)
    } catch (error) {
        console.error("Error creating menu item:", error);
        res.status(500).json({ error: error.message });
    }
}

exports.getMenu = async (req,res,next) => {
    try {
        const menu = await prisma.menuItem.findMany({
            include : {
                category : true
            }
        })
        res.json(menu)
    } catch (error) {
        next(error)
    }
}

exports.GetOneMenu = async (req,res,next) => {
    try {
        const {id } = req.params
        const menu = await prisma.menuItem.findUnique({
            where : {
                id : Number(id)
            },
            include : {
                category : true
            }
        })
        res.json(menu)
    } catch (error) {
        next(error)
    }
}
exports.UpdateMenu = async (req,res,next) => {
    try {
        const {id } = req.params
        const { name,description,price,imageUrl,categoryId } = req.body
        const menu = await prisma.menuItem.update({
            where : {
                id : Number(id)
            },
            data : {
                name,
                description,
                price,
                imageUrl,
                categoryId
            },
            include : {
                category : true
            }
        })
        res.json(menu)
    } catch (error) {
        next(error)
    }
}

exports.deleteMenu = async (req,res,next) => {
    try {
        const {id} = req.params
        const menu = await prisma.menuItem.delete({
            where: {
                id : Number(id)
            }
        })
        res.send("Menu Deleted Successfully")
    } catch (error) {
        next(error)
    }
}