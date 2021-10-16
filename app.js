const express = require("express");
const mongoose = require('mongoose');
const moment = require('moment');
const app = express();

app.use(express.json());

mongoose.connect("mongoose.connect('mongodb://localhost:27017/yammieDB");
app.listen(3000, function () {
    console.log("Server started on port 3000");
});

const dishSchema = {
    idCode: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true }
}

const orderSchema = {
    orderCode: { type: Number, required: true, unique: true },
    shoppingCart: { type: [Number], required: true },
    status: { type: String, enum: { values: ['ORDERED', 'READY', 'DELIVERED'], message: '{VALUE} is not supported' } },
    date: { type: Date, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },
    familyName: { type: String, required: true },
    phone: { type: String, required: true },
    adress: { type: String, required: true }
}

const Dish = mongoose.model("Dish", dishSchema);
const Order = mongoose.model("Order", orderSchema);

app.get("/orders", function (req, res) {

    Order.find(function (err, foundOrders) {
        res.send(foundOrders);
    });

});

app.get("/orders/lastDay", function (req, res) {

    const today = moment();
    const lastDay = moment().subtract(1, 'day');

    Order.find({ date: { $gte: moment.utc(lastDay), $lte: moment.utc(today) } }, function (err, foundOrders) {
        res.send(foundOrders);
    });
});

app.post("/dishes", function (req, res) {

    const newDish = new Dish({
        idCode: req.body.idCode,
        name: req.body.name,
        price: req.body.price
    });

    newDish.save(function (err) {

        if (!err) {
            res.send("Successfully added a new dish");
        }
        else {
            res.send("The dish could not be added");
        }
    });
});

app.post("/orders", function (req, res) {

    Dish.find(function (err, foundDishes) {
        if (!err) {
            let dishesIdCode = [];
            let dishesPrice = [];
            foundDishes.forEach(function (dish) {
                let code = dish.idCode;
                let price = dish.price;
                dishesIdCode.push(code);
                dishesPrice.push(price);
            })
            if (validateOrder(dishesIdCode, req.body.shoppingCart)) {

                const totalPrice = calculatePrice(req.body.shoppingCart, dishesIdCode, dishesPrice);
                const newOrder = new Order({
                    orderCode: req.body.orderCode,
                    shoppingCart: req.body.shoppingCart,
                    status: "ORDERED",
                    date: new Date(req.body.date),
                    price: totalPrice,
                    name: req.body.name,
                    familyName: req.body.familyName,
                    phone: req.body.phone,
                    adress: req.body.adress
                });

                newOrder.save(function (err) {

                    if (!err) {
                        res.send("Successfully added a new order");
                    }
                    else {
                        res.send("The order could not be added");
                    }
                });

            }

            else {
                res.send("The order could not be added");
            }
        }

        else {
            res.send("The order could not be added");
        }
    });
});


const validateOrder = (arr, target) => target.every(v => arr.includes(v));

function calculatePrice(shoppingCart, dishesIdCode, dishesPrice) {

    let totalPrice = 0;
    shoppingCart.forEach((element) => {
        totalPrice = dishesPrice[dishesIdCode.indexOf(element)] + totalPrice;
    });

    return totalPrice;
}


module.exports = app;













