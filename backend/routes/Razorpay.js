require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Ticket = require('../models/Ticket'); // Assuming you have created the Ticket schema

const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create an order and handle payment
router.post('/create-order', async (req, res) => {
    const { ticketId } = req.body;

    try {
        const ticket = await Ticket.findById(ticketId).populate('show cinemaHall user');
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Create an order in Razorpay
        const options = {
            amount: ticket.price * 100, // Razorpay expects the amount in paise (100 paise = 1 INR)
            currency: 'INR',
            receipt: `receipt_${ticket._id}`,
            payment_capture: 1, // Auto capture
        };

        const order = await razorpay.orders.create(options);

        // Send order details back to client
        res.status(200).json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
            ticketId: ticket._id,
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error.message);
        res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
});

// Verify the payment and update ticket status
router.post('/verify-payment', async (req, res) => {
    const { order_id, payment_id, signature, ticketId } = req.body;

    // Generate expected signature using HMAC SHA256
    const generated_signature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(order_id + "|" + payment_id)
        .digest('hex');

    if (generated_signature === signature) {
        try {
            // Update the ticket payment status to 'Completed'
            const ticket = await Ticket.findById(ticketId);
            ticket.paymentStatus = 'Completed';
            await ticket.save();

            res.status(200).json({ message: 'Payment successful', ticket });
        } catch (error) {
            console.error('Error updating ticket:', error.message);
            res.status(500).json({ message: 'Failed to update ticket', error: error.message });
        }
    } else {
        res.status(400).json({ message: 'Invalid signature, payment verification failed' });
    }
});

module.exports = router;
