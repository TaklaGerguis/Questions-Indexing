module.exports = mongoose => {
    const topicSchema = mongoose.Schema(
        {
            name: String,
            questions: [Number]
        },
        {timestamps: true}
    );


    topicSchema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("topics", topicSchema);
};
