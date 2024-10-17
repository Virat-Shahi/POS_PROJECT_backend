const { PaymentStatus } = require('@prisma/client')
const prisma = require('../config/prisma')
exports.processPayment = async (req, res,next) => {
try {
    // 1. Extract payment details from the request body
    const {orderId,PaymentMethod,amount} = req.body
    if(!orderId || !PaymentMethod || !amount){
        throw new Error('Missing required fields')
    }

    // 2. Create a new payment

    const payment = await prisma.payment.create({
        data: {
            orderId: parseInt(orderId),
            method: PaymentMethod,
            amount: parseFloat(amount),
            status: 'COMPLETED',
            paymentDate: new Date()
        }
    })

    res.status(200).json({message : 'Payment processed successfully', 
    payment : payment})
} catch (error) {
    console.error("Error processing payment:", error);
    next(error)
}
}