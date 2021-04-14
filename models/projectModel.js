const mongoose = require('mongoose');

const ProjectModelSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    project_name: {
        type: String, 
        required: true
    },
    section_ids: {
        type: Array,
        default: []
    },
    task_ids: {
        type: Array,
        default: []
    },
    is_completed: {
        type: Boolean,
        default: false
    },
    is_archieved: {
        type: Boolean,
        default: false
    },
    invited_user_ids: { 
        type: Array, 
        default: []
    }
})

const ProjectModel = mongoose.model('ProjectModel', ProjectModelSchema);
module.exports = ProjectModel;