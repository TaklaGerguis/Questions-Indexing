var tree = require('mongoose-tree');

module.exports = mongoose => {
    var topicSchema = mongoose.Schema(
        {
            name: String,
            child1: String,
            child2: String
        },
        {timestamps: true}
    );

    topicSchema.plugin(tree);

    var topic = mongoose.model("topic", topicSchema);

    var topic1 = new topic({ name : 'topic1' });
    var topic2 = new topic({ name : 'topic2' });
    var topic3 = new topic({ name : 'topic3' });

    topic2.parent = topic1;
    topic3.parent = topic2;
    topic1.save(function() {
        topic2.save(function() {
            topic3.save();
        });
    });

    topicSchema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("topic", topicSchema);
};
