const express = require('express')
const router = express.Router()
const orderController = require('../Controllers/Order-controller')


router.get('/',orderController.getOrders )

router.post('/',orderController.createOrder)

router.put('/:id',orderController.updateOrder)

router.delete('/:id', orderController.deleteOrder)

router.get('/:id',orderController.getOrder)

module.exports = router