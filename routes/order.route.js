const router = require('express').Router();
const ordersService = require('../services/order.service');
const ordersServiceInst = new ordersService();
const validator = require('../middleware/orders.validation')

// API route to get all orders
router.get('/orders', async function(req, res) {
    console.info("API -> GET /orders")
    let result;
    try {
        // Calling the function to get the order data.
        result = await ordersServiceInst.getOrders();
        return res.status(result.code).json(result);
    }
    catch(err) {
        return res.status(result.code).json(result);
    }}   
)

router.post('/orders', validator.totalFeeValidation, async function(req, res) {
    console.info("API -> POST /orders")
    let result;
    try {
        const result = await ordersServiceInst.createOrder(req.body);
        return res.status(result.code).json(result);
    }
    catch(err) {
        return res.status(result.code).json(result);
    }}
)

router.get('/orders/orderId/:id', async function(req, res) {
    console.info("API -> GET /orders/orderId/:id")
    let result;
    try {
        result = await ordersServiceInst.getOrders(req.params.id);
        return res.status(result.code).json(result);
    }
    catch(err) {
        return res.status(result.code).json(result);
    }}   
)

router.delete('/orders', validator.orderIdValidation, async function(req, res) {
    console.info("API -> DELETE /orders")
    let result;
    try {
        result = await ordersServiceInst.deleteOrder(req.body.id);
        return res.status(result.code).json(result);
    }
    catch(err) {
        return res.status(result.code).json(result);
    }}   
)

router.put('/orders', validator.totalFeeValidation, async function(req, res) {
    console.info("API -> DELETE /orders")
    let result;
    try {
        result = await ordersServiceInst.updateOrder(req.body);
        return res.status(result.code).json(result);
    }
    catch(err) {
        return res.status(result.code).json(result);
    }}   
)
module.exports = router;
