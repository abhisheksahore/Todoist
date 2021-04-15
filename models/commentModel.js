const mongoose = require('mongoose');

const CommentModelSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    commented_by: {
        type: String,
        required: true
    },
    comment_text: {
        type: String,
        required: true
    },
    invited_user_ids: { 
        type: Array, 
        default: []
    }
})

const CommentModel = mongoose.model('CommentModel', CommentModelSchema);

module.exports = commentModel;