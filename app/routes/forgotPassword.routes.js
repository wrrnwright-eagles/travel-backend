module.exports = (app) => {
    const ForgotPassword = require("../controllers/ForgotPassword.controller.js");
    var router = require("express").Router();

    // Handle forgot password request
    router.post("/forgot-password", (req, res, next) => {
        console.log('forgot password route hit');
        ForgotPassword.forgotPassword(req, res, next);
    });

    app.use("/travelapi", router);
};
