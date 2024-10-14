const express = require('express')
const router = express.Router()
const menuController = require('../Controllers/menu-controller')


router.post('/',menuController.createMenu )

router.get('/', menuController.getMenu )
router.get('/:id', menuController.GetOneMenu )
router.put('/:id', menuController.UpdateMenu)
router.delete('/:id', menuController.deleteMenu)


module.exports = router;