const db = require("../models");
const Topic = db.topics;


exports.getQuestionsByTopicName = async (req, res) => {

    let name = req.query.name;

    name = name.replace(/^"(.*)"$/, '$1');

    Topic.find({name: name}).select("questions -_id")
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found Questions for topic: " + name});
            else {
                res.send(data);
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving Questions for topic: " + name});
        });
}
