const mongoose = require('mongoose');

// Order schema having field id, dateTime, totalfee, service
const ordersSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    dateTime: {
        type: Date,
        default: new Date()
    },
    totalfee: {
        type: Number,
        required: true
    },
    service: {
        type: Array
    }
   })

//Creating the collection Orders
const Orders = mongoose.model('orders', ordersSchema)
module.exports = Orders;
