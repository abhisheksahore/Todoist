const mongoose = require('mongoose');

const CommentModelSchema = new mongoose.Schema({
    commented_by: {
        type: String,
        required: true
    },
    comment_text: {
        type: String,
        required: true
    },
    task_id: {
        type: String,
        required: true
    },
    visible_to_usernames: { 
        type: Array, 
        default: []
    }
}) 

const CommentModel = mongoose.model('CommentModel', CommentModelSchema);

module.exports = CommentModel;