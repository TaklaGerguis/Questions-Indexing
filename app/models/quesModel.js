module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            number: Number,
            annotation_1: String,
            annotation_2: String,
            annotation_3: String,
            annotation_4: String,
            annotation_5: String
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("question", schema);
};
