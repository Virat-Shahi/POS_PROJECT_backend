const { PaymentStatus } = require('@prisma/client')
const prisma = require('../config/prisma')
const createError = require('../Utils/createError')
exports.initiatePayment = async (req, res, next) => {
    try {
        const { orderId, paymentMethod, amount } = req.body
        if (!orderId || !paymentMethod || !amount) {
            createError(400, 'Missing required fields')
        }

        if (!['CASH', 'QR'].includes(paymentMethod)) {
            createError(400, 'Invalid payment method')
        }

        // Check if a payment for this order already exists
        const existingPayment = await prisma.payment.findUnique({
            where: { orderId: parseInt(orderId) }
        });

        if (existingPayment) {
            createError(400, 'Payment already initiated for this order')
        }

        const payment = await prisma.payment.create({
            data: {
                orderId: parseInt(orderId),
                method: paymentMethod,
                amount: parseFloat(amount),
                status: PaymentStatus.PENDING,
                paymentDate: new Date(),
            }
        })

        res.status(200).json({
            message: 'Payment initiated successfully',
            payment: payment
        })
    } catch (error) {
        console.log("Error initiating payment backend", error)
        next(error)
    }

}

exports.processPayment = async (req, res, next) => {
    try {
        const { paymentId } = req.params
        if (!paymentId) {
            return res.status(400).json({ message: 'Missing payment ID' })
        }

        // Update payment status to PROCESSING
        const payment = await prisma.payment.update({
            where: { id: parseInt(paymentId) },
            data: { status: PaymentStatus.COMPLETED },
            include: { order: true }
        })

        await prisma.table.update({
            where: { id: payment.order.tableId },
            data: { isOccupied: false }
        });

        res.status(200).json({
            message: 'Payment processing initiated',
            payment: payment
        })
    } catch (error) {
        console.error('Error completing payment:', error)
           // Handle failed payments
                await prisma.payment.update({
                    where: { id: parseInt(paymentId) },
                    data: { status: PaymentStatus.FAILED }
                })
        next(error)
    }
}

exports.getPaymentStatus = async (req, res, next) => {
    try {
        const { paymentId } = req.params
        const payment = await prisma.payment.findFirst({
            where: { id: parseInt(paymentId) }

        })
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" })
        }
        res.status(200).json({
            message: "Payment status fetched successfully",
            payment: payment
        })

    } catch (error) {
        console.log("Error getting payment status", error)
        next(error)
    }
}