const express = require('express');
const { createOrder, deleteOrder, getAllOrders, getOrder, getOrdersByCustomerId, updateOrder } = require('../../Controlers/Inventary/order.controller');

const router = express.Router();

// Customer order handling routes
router.post('/create', createOrder);
router.get('/getorders', getAllOrders);
router.get('/getorder/:id', getOrder);
router.delete('/deleteorder/:id', deleteOrder);
router.put('/updateorder/:id', updateOrder);
router.get("/customer/:id", getOrdersByCustomerId);

module.exports = router;
