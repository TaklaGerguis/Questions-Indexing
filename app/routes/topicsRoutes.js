module.exports = app => {
    const topics = require("../controllers/topicController.js");

    const router = require("express").Router();

    router.get("/search/", topics.getQuestionsByTopicName);

    app.use("/pencil/topics", router);
};
