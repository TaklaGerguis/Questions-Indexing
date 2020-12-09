const db = require("../models");
const Topic = db.topics;
const TopicService = require("../services/TopicService");
const TopicServiceInstance = new TopicService();


// // Create and Save a new Tutorial
// exports.create = (req, res) => {
//     // Validate request
//     if (!req.body.title) {
//         res.status(400).send({ message: "Content can not be empty!" });
//         return;
//     }
//
//     // Create a Tutorial
//     const tutorial = new Tutorial({
//         title: req.body.title,
//         description: req.body.description,
//         published: req.body.published ? req.body.published : false
//     });
//
//     // Save Tutorial in the database
//     tutorial
//         .save(tutorial)
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while creating the Tutorial."
//             });
//         });
// };

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const number = req.query.number;
    var condition = number ? { number: { $regex: new RegExp(number), $options: "i" } } : {};

    Topic.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving questions."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const name = req.params.name;

    Topic.find({name: name})
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Question with number " + name });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Question with number=" + name });
        });
};

exports.getQuestionsByTopicName = async (req, res) => {

    try {
        const questionsNumbers = await TopicServiceInstance.getAllQuestionsByTopicName(req.body);

        return res.send(questionsNumbers);

    } catch (err) {
        res.status(500).send(err);
    }
}


