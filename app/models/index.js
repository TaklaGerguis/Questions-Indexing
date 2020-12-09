const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.questions = require("./quesmodel.js")(mongoose);
db.topics = require("./topicModel.js")(mongoose);

module.exports = db;
