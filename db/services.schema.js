const mongoose = require('mongoose');

// Schema for Service
const serviceSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    }
   })

//Creating the collection Orders
const Services = mongoose.model('services', serviceSchema)
module.exports = Services;
