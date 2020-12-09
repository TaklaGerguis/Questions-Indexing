module.exports = app => {
    const questions = require("../controllers/questionController.js");

    var router = require("express").Router();

    // // Create a new Tutorial
    // router.post("/", tutorials.create);

    // Retrieve all Tutorials
    router.get("/", questions.findAll);


    //
    // // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:number", questions.findOne);

    app.use("/api/questions", router);
};
