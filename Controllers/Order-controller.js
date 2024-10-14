const prisma = require('../config/prisma')



    exports.createOrder = async (req, res) => {
        try {
            const { userId, tableId, orderItems } = req.body;
    
            // Calculate total amount before creating the order
            const totalAmount = orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    
            const order = await prisma.order.create({
                data: {
                    userId,
                    tableId,
                    totalAmount,
                    orderItems: {
                        create: orderItems.map(item => ({
                            menuItemId: item.menuItemId,
                            quantity: item.quantity,
                            price: item.price
                        }))
                    }
                },
                include: {
                    orderItems: {
                        include: {
                            menuItem: {
                                select: {
                                    name: true,
                                    price: true
                                }
                            }
                        }
                    }
                }
            });
    
            res.status(201).json(order);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    };
exports.getOrders = async (req, res, next) => {
    try {
        const orders = await prisma.order.findMany({
            include : {
                orderItems : {
                    include : {
                        menuItem : true
                    }
                },
                table : true,
                payments : true
            }
        })

        res.json(orders)
    } catch (error) {
        console.log("Error Getting Orders Backend",error)
        next(error)
    }
}

exports.getOrder = async (req,res,next) => {
    try {
        const { id } = req.params
        const order = await prisma.order.findUnique({
            where : {
                id : id 
            },
            include : {
                orderItems : {
                    include : {
                        menuItem : true
                    }
                },
                table : true,
                payments : true
            }
        })

        res.json(order)
    } catch (error) {
        console.log("Error getting single order backend",error)
        next(error)
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { tableId, orderItems } = req.body;

        // Calculate total amount upfront
        const totalAmount = orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);

        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(id) },
            data: {
                tableId,
                totalAmount,
                orderItems: {
                    deleteMany: {},
                    create: orderItems.map(item => ({
                        menuItemId: item.menuItemId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            },
            include: {
                orderItems: {
                    include: {
                        menuItem: true
                    }
                },
                table: true,
                payment: true
            }
        });

        res.json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        // First, check if the order exists
        const order = await prisma.order.findUnique({
            where: { id: parseInt(id) }
        });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // If the order exists, delete it
        await prisma.order.delete({
            where: { id: parseInt(id) }
        });

        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ message: "Error deleting order", error: error.message });
    }
};