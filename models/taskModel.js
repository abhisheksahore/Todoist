const mongoose = require('mongoose');



const TaskModelSchema = new mongoose.Schema({
    user_name: {
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
        default: null
    },
    comments: {
        type: Array,
        default: []
    },
    label_ids: {
        type: Array,
        default: []
    },
    priority: {
        type: Number,
        default: 4
    },
    // group_id: {
    //     type: String
    // },
    // section_id: {
    //     type: String
    // },
    
    task_creation_timestamp: {
        type: Date,
        default: new Date()
    },
    subtasks_id: { 
        type: Array,
        default: [] 
    },
    invited_user_ids: { 
        type: Array, 
        default: []
    },
    directly_in_project: { 
        type: Boolean, 
        required: true
    },
    in_section: { 
        type: Boolean, 
        required: true
    } 
})

const TaskModel = mongoose.model('TaskModel', TaskModelSchema);
module.exports = TaskModel;