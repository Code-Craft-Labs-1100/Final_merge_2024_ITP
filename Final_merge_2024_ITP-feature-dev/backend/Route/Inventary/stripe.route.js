const express = require('express');
const { createSession, handleWebhook } = require('../../Controlers/Inventary/stripe.controller');

const router = express.Router();

router.post('/create-checkout-session', createSession);
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

module.exports = router;
