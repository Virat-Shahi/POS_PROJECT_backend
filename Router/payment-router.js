const express = require('express')
const router = express.Router()
const paymentController = require('../Controllers/payment-controller')


router.post('/initiate', paymentController.initiatePayment);
router.post('/process/:paymentId', paymentController.processPayment)
router.get('/status/:paymentId', paymentController.getPaymentStatus)
router.delete('/:paymentId', paymentController.DeletePayment)

module.exports = router;