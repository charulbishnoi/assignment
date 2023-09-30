const mongoose = require('mongoose');
const Order = require('../db/orders.schema');
const Service = require('../db/services.schema');
const Promise = require('bluebird');
const _ = require('lodash');
const error = require('../errors/error.json');

class OrderService {

    /**
     * Function will create a order and save the record in Database
     * @param {*} reqBody 
     * @param {reqBody.totalfee} totalfee Order Fees
     */
    async createOrder(reqBody) {
        try {
            let serviceObj = {
                id: '123',
                name: 'Inspection'
            }

            // Preparing the object for new order
            let prepareObject = {
                id: Math.floor(1000 + Math.random() * 9000),
                totalfee: reqBody.totalfee,
                service: [serviceObj]
            }

            const threeHoursAgo = new Date();
            threeHoursAgo.setHours(threeHoursAgo.getHours() - 3);

            const existingOrder = await Order.findOne({
                dateTime: { $gte: threeHoursAgo },
            });

            if (existingOrder) {
                return { code:400, success: false,  data: 'An order already created before 3 hours' };
            }

            // Save the result into Database
            const result = await Order.create(prepareObject);
            if (!result) {
                return { code: 400, success: false, data: "Bad Request! Something went wrong." }
            }
            return { code: 200, success: true, data: "Ordre created" }
        } catch (error) {
            console.error("Error occured while creating order ", error);
            return { code: 500,  success: false, data: "Internal server error" };
        }

    }

    /**
     * Function will return the order details
     * @param {orderId} orderId 
     */
    async getOrders(orderId) {
        try {
            let orders;
            if(orderId)
                orders = await Order.find({id: orderId});
            else 
                orders = await Order.find();

            return { code: 200, success: true, data: orders };

        } catch (error) {
            console.error("Error occured while fetching order ", error);
            return {code: 500, success: false, data: 'Error occured while fetching the record' };
        }
    }

    /**
     * Function will delete an order from DB.
     * @param {orderId} orderId Order Id
     */
    async deleteOrder(orderId) {
        try {
            // Check if order exist in database or not.
            let order = await Order.find({id: orderId});
            if(_.isEmpty(order)) {
                return error.OrderNotFound;;
            }
            await Order.deleteOne({id: orderId});
            return { code: 200, success: true, data: 'Order deleted successfully' };
        }
        catch(err) {
            console.error("Error occured while deleting order ", err);
            return {code: 500, success: false, data: 'Error occured while deleting the order' };
        }
    }

    /**
     * Function will update the order details
     * @param {*} reqBody Order request body
     * @param {reqBody.totalfee} totalfee Order total fee
     */
    async updateOrder(reqBody) {
        try {
            // Check if order exist in database or not.
            let order = await Order.find({id: reqBody.id});
            
            if(_.isEmpty(order)) {
                return error.OrderNotFound;
            }

            const threeHoursAgo = new Date();
            threeHoursAgo.setHours(threeHoursAgo.getHours() - 3);

            const existingOrder = await Order.findOne({
                dateTime: { $gte: threeHoursAgo },
            });

            if (existingOrder) {
                return { code:400, success: false,  data: 'An order already created before 3 hours' };
            }

            // Updating the required arguments
            let updateArgs = {
                totalfee: reqBody.totalfee
            }
            await Order.updateOne({id: reqBody.id}, updateArgs);
            return { code: 200, success: true, data: 'Order updated successfully' };
        }
        catch(err) {
            console.error("Error occured while updating order ", err);
            return {code: 500, success: false, data: 'Error occured while updating the order' };
        }
    }
}

module.exports = OrderService;