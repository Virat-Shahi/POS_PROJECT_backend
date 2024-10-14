const express = require('express')
const router = express.Router()



router.get('/', (req,res) => {
    res.send("Get All Orders")
})

router.post('/', (req,res) => {
    res.send("Create Order")
})

router.put('/:id', (req,res) => {
    res.send("Update Order")
})

router.delete('/:id', (req,res) => {
    res.send("Delete Order")
})

router.get('/:id', (req,res) => {
    res.send("Get One Order")
})

module.exports = router