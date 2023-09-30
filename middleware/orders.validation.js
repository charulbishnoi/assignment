const _ = require('lodash');
const error = require('../errors/error.json')

// Function will validate the totalFee attribute
function totalFeeValidation(req, res, next) {
    if(typeof req.body.totalfee === "undefined" ) {
        return res.status(400).json(error.InsufficentArguments)
    }
    if(!_.isNumber(req.body.totalfee) || req.body.totalfee <= 0){
        return res.status(412).json({code: 412, custom_code: 'VALIDATION_ERROR', data : 'Total fee should be number and value should be greater than 0'})
    }
    return next();
}

// Function will validate the order Id attribute
function orderIdValidation(req, res, next) {
    if(typeof req.body.id === "undefined" ) {
        return res.status(400).json(error.InsufficentArguments)
    }
    if(!_.isString(req.body.id)){
        return res.status(412).json({code: 412, custom_code: 'VALIDATION_ERROR', data : 'Order Id should be string'})
    }
    return next();
}

module.exports = {
    totalFeeValidation: totalFeeValidation,
    orderIdValidation: orderIdValidation
}