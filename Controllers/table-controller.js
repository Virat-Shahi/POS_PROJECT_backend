const prisma = require('../config/prisma')

exports.getTables = async (req, res, next) => {
    try {
        const tables = await prisma.table.findMany()
        res.json(tables)
    } catch (error) {
        next(error)
    }
}

exports.getOneTable = async (req, res, next) => {
    try {
        const { id } = req.params;
        const table = await prisma.table.findUnique({
            where: { id: parseInt(id) },
            include: {
                orders: {
                    include: {
                        orderItems: {
                            include: {
                                menuItem: true
                            }
                        }
                    }
                }
            }
        });
        res.json(table)
    } catch (error) {
        next(error)
    }
}

exports.updateTable = async (req, res, next) => {
    try {
        const { id } = req.params
        const {isOccupied} = req.body
        const table = await prisma.table.update({
            where: {
                id: Number(id)
            },
            data: {
                isOccupied
            }
        })
        res.json(table)

    } catch (error) {
        next(error)
    }
}