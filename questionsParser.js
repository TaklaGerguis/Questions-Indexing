const fs = require('fs');
const bodyParser = require("body-parser");
const csv = require('csv-parser');
const db = require("./app/models");
const cors = require("cors");
const express = require("express");
const app = express();

var corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));


app.use(bodyParser.json());


app.use(bodyParser.urlencoded({extended: true}));


db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });


require("./app/routes/topicsRoutes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

let topicsQuestionsMap = {};


    fs.createReadStream('questions.csv')
        .pipe(csv())
        .on('data', function (row) {

            let quesNum = row.number;

            let ann1 = row.annotation_1;
            if (row.annotation_1 !== '' && ann1 in topicsQuestionsMap) {
                topicsQuestionsMap[ann1].add(quesNum);
            } else if(row.annotation_1 !== ''){
                topicsQuestionsMap[ann1] = new Set();
                topicsQuestionsMap[ann1].add(quesNum);
            }

            let ann2 = row.annotation_2;
            if (row.annotation_2 !== '' && ann2 in topicsQuestionsMap) {
                topicsQuestionsMap[ann2].add(quesNum);
            } else if(row.annotation_2 !== ''){
                topicsQuestionsMap[ann2] = new Set();
                topicsQuestionsMap[ann2].add(quesNum);
            }

            let ann3 = row.annotation_3;
            if (row.annotation_3 !== '' && ann3 in topicsQuestionsMap) {
                topicsQuestionsMap[ann3].add(quesNum);
            } else if(row.annotation_3 !== ''){
                topicsQuestionsMap[ann3] = new Set();
                topicsQuestionsMap[ann3].add(quesNum);
            }

            let ann4 = row.annotation_4;
            if (row.annotation_4 !== '' && ann4 in topicsQuestionsMap) {
                topicsQuestionsMap[ann4].add(quesNum);
            } else if(row.annotation_4 !== ''){
                topicsQuestionsMap[ann4] = new Set();
                topicsQuestionsMap[ann4].add(quesNum);
            }

            let ann5 = row.annotation_5;
            if (row.annotation_5 !== '' && ann5 in topicsQuestionsMap) {
                topicsQuestionsMap[ann5].add(quesNum);
            } else if (row.annotation_5 !== '') {
                topicsQuestionsMap[ann5] = new Set();
                topicsQuestionsMap[ann5].add(quesNum);
            }
        })


let topicsAllQuestionsMap = {};

setTimeout(function addAllTopicsQuestions() {

    fs.createReadStream('topics.csv')
        .pipe(csv())
        .on('data', function (row) {

            if(topicsQuestionsMap[row.level1] === undefined){
                topicsQuestionsMap[row.level1] = new Set();
            }
            if(topicsQuestionsMap[row.level2] === undefined){
                topicsQuestionsMap[row.level2] = new Set();
            }
            if(topicsQuestionsMap[row.level3] === undefined){
                topicsQuestionsMap[row.level3] = new Set();
            }

            let level1Set = topicsQuestionsMap[row.level1];
            let level2Set = topicsQuestionsMap[row.level2];
            let level3Set = topicsQuestionsMap[row.level3];

            if(topicsAllQuestionsMap[row.level1] === undefined)
            {
                topicsAllQuestionsMap[row.level1] = level1Set;
            }
            if(topicsAllQuestionsMap[row.level2] === undefined)
            {
                topicsAllQuestionsMap[row.level2] = level2Set;
            }
            if(topicsAllQuestionsMap[row.level3] === undefined)
            {
                topicsAllQuestionsMap[row.level3] = level3Set;
            }
            level3Set.forEach(topicsAllQuestionsMap[row.level2].add, topicsAllQuestionsMap[row.level2]);
            level2Set.forEach(topicsAllQuestionsMap[row.level1].add, topicsAllQuestionsMap[row.level1]);
            level3Set.forEach(topicsAllQuestionsMap[row.level1].add, topicsAllQuestionsMap[row.level1]);



        })


}, 5000)
setTimeout(function insertTopicsToDatabase() {

    for (let file in topicsAllQuestionsMap) {
        let arr;
        if (topicsAllQuestionsMap[file] !== undefined && topicsAllQuestionsMap[file] !== '') {
            arr = Array.from(topicsAllQuestionsMap[file]);
        } else if(topicsAllQuestionsMap[file] !== ''){
            arr = [];
        }
        db.topics.create({name: file, questions: arr}
            , function (err, res) {
                if (err) throw err;
            });
    }

}, 10000)
