module.exports = app => {
    const topics = require("../controllers/topicController.js");

    var router = require("express").Router();



    router.get("/", topics.findAll);
    router.get("/:name", topics.findOne);

    app.use("/api/topics", router);
};
