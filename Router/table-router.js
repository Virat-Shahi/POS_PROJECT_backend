const express = require('express')
const router = express.Router()
const tableController = require('../Controllers/table-controller')

router.get('/', tableController.getTables)
router.get('/:id', tableController.getOneTable)
router.put('/:id', tableController.updateTable)

module.exports = router