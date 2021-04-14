const mongoose = require('mongoose');

const SectionModelSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    section_name: {
        type: String,
        required: true
    },
    task_ids: {
        type: Array,
        default: []
    },
    invited_user_ids: { 
        type: Array, 
        default: []
    }

})

const SectionModel = mongoose.model('SectionModel', SectionModelSchema);
module.exports = SectionModel;