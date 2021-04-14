const mongoose = require('mongoose');

const TaskModelSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    task_name: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    task_due_date: {
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
    group_id: {
        type: String
    },
    section_id: {
        type: String
    },
    task_creation_date: {
        type: Date,
        default: new Date()
    },
    sublists_id: { 
        type: Array,
        dafault: [] 
    },
    invited_user_ids: { 
        type: Array, 
        default: []
    }
})

const TaskModel = mongoose.model('TaskModel', TaskModelSchema);
module.exports = TaskModel;