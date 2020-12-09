const MongooseService = require("./MongooseService");
const QuestionModel = require("./models/quesModel");
const HashSet = require('hashset');


class QuestionService{

    constructor(){

        this.MongooseServiceInstance = new MongooseService(QuestionModel);
    }

    getQuestionsByTopic(topics){

        var questionNumbers = new HashSet();

        for(var i=0 ;i<topics.length;i++){

            var questions = this.getTopicQuestions(topics[i]);

            for(var j=0;j<questions.length;j++){
                questionNumbers.add(questions[j]);
            }
        }

        return questionNumbers;
    }

    async getTopicQuestions(topic) {

        var res = db.questions.find({ $or: [ { annotation_1: topic }, { annotation_2: topic }, { annotation_3: topic },
                { annotation_4: topic }, { annotation_5: topic } ] }).select('question_number -_id');

        return res;
    }
}

module.exports = QuestionService;
