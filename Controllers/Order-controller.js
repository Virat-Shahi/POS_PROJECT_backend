const prisma = require('../config/prisma')



exports.createOrder = async (req, res) => {
    try {
        const { tableId, order } = req.body;
        const userId = req.user.id
        console.log(order)
        const orderItems = JSON.parse(order)
        // Calculate total amount before creating the order
        const totalAmount = orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);

        const OrderCreate = await prisma.order.create({
            data: {
                userId,
                tableId: Number(tableId),
                totalAmount,
                orderItems: {
                    create: orderItems.map(item => ({
                        menuItemId: item.id,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            },
            include: {
                orderItems: true
            }
        });
        // Update the table status to occupied
        await prisma.table.update({
            where: { id: Number(tableId) },
            data: { isOccupied: true }
        });


        res.status(201).json(OrderCreate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
exports.getOrders = async (req, res, next) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                orderItems: {
                    include: {
                        menuItem: true
                    }
                },
                table: true,
                payments: true
            }
        })

        res.json(orders)
    } catch (error) {
        console.log("Error Getting Orders Backend", error)
        next(error)
    }
}

exports.getOrder = async (req, res, next) => {
    try {
        const { id } = req.params
        const order = await prisma.order.findUnique({
            where: {
                id: id
            },
            include: {
                orderItems: {
                    include: {
                        menuItem: true
                    }
                },
                table: true,
                payments: true
            }
        })

        res.json(order)
    } catch (error) {
        console.log("Error getting single order backend", error)
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