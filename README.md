## Problem statement
Your mission is to build a portion of an order management system. You need to provide a service that allows other systems and teams to obtain information about orders.

## Solution
I have created a service that will take care of all the operation like GET, POST, PUT, DELETE.

1. API -> GET /orders/ -> It will return all the orders
2. API -> POST /orders -> Create a order
3. API -> DELETE /orders -> Delete a order
4. API -> PUT /orders -> Update a order
5. API -> GET /orders/order/:id -> Get a specific order.

In the implementation of the order management system, I have created two schema one for order and another for service. Each schema have corresponding field. 

## Tech stack
* Backend - Node JS
* Database - MongoDB
* Test framework - Jest

## Time spent -> 2h

## How to run the application
### Required Packages
* Node JS v16+
* MongoDB v5+

### Steps
1. Pull the code from github link - and go to the project directory
2. Run mongo db service or docker container.
2. Install the packges by executing the command ```npm i```.
3. Run the applicatio  by executing node ```server.js```.