const mongoose = require('mongoose');
const SubtaskModelSchema = new mongoose.Schema({
    subtask_name: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    subtask_due_date: {
        type: Date,
    },
    comments: {
        type: Array,
        default: []
    },
    label_ids: {
        type: Array,
        dafault: []
    },
    priority: {
        type: Number,
        default: 4
    },
    task_id: {
        type: String,
        required: true
    },
    subtask_creation_date: {
        type: Date,
        default: new Date()
    },
    invited_user_ids: { 
        type: Array, 
        default: []
    }
})

const SubtaskModel = mongoose.model('SubtaskModel', SubtaskModelSchema);
module.exports = SubtaskModel;