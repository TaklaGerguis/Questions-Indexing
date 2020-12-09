const MongooseService = require("./MongooseService");
const TopicModel = require("./models/topicModel");
const QuestionService = require("./QuestionService.class");
const QuestionServiceInstance = new QuestionService();


class TopicService{

    constructor() {
        this.MongooseServiceInstance = new MongooseService(TopicModel);

    }

    async getQuestionsByTopic(topicName){

        try{

            const res = this.MongooseServiceInstance.getQuestionsByTopic(topicName);

            return {success : true, body: res};

        } catch (err){
            return {success : false, error: err};
        }
    }

     getAllQuestionsByTopicName(topicName){

        const topicDescendants = this.getTopicDescendants(topicName);

        const res = this.getAllQuestionsByTopic(topicDescendants);

        return res;

    }

    async getTopicDescendants(topicName){

        var descendants=[]
        var stack=[];
        var topic = db.topics.findOne({name:topicName});
        stack.push(topic);
        while (stack.length>0){
            var currentTopic = stack.pop();
            var children = db.topics.find({_id:{$in:currentTopic.childs}});
            while(true === children.hasNext()) {
                var child = children.next();
                descendants.push(child._id);
                if(child.childs.length>0){
                    stack.push(child);
                }
            }
        }

        descendants.join(",")

        return descendants;
    }

    async getAllQuestionsByTopic(topicName){

        try{

            const res = QuestionServiceInstance.getQuestionsByTopic(topicName);

            return {success : true, body: res};

        } catch (err){
            return {success : false, error: err};
        }
    }

}

module.exports = TopicService;
