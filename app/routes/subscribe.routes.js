module.exports = (app) => {
    const Subscribe = require("../controllers/Subscribe.controller.js");
    var router = require("express").Router();

    // Handle Subscribe request
    router.post("/subscribe", (req, res, next) => {
        console.log('subsribe route hit');
        Subscribe.subscribe(req, res, next);
    })

    app.use("/travelapi", router);
};
