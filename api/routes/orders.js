const express = require("express");
const router = express.Router();

router.get("/", (req, res, next)=>{
    res.status(200).json({
        message: "orders "
    });
});

router.get("/:orderId", (req, res, next)=>{
    const id = req.params.orderID;
    res.status(200).json({
        message: "This is one order ",
        id
    });
});

router.post("/", (req, res, next)=>{
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: "order was created ",
        order
    });
});

router.delete("/:orderId", (req, res, next)=>{
    const id = req.params.orderID;
    res.status(200).json({
        message: "Deleted one order ",
        id
    });
});

module.exports= router;