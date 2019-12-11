var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

router.get("/burgers", function(req, res) {
    burger.selectAll(function(data) {
        res.json({ burgers: data});
    })
})

module.exports = router;