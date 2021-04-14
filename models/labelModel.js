const mongoose = require('mongoose');

const LabelModelSchema = new mongoose.Schema({
    label_name: {
        type: String,
        required: true
    },
    label_color: {
        type: String,
        dafault: "#ff6347"
    },
    user_id: {
        type: String,
        required: true
    },
    task_ids: {
        type: Array,
        default: []
    },
    subtask_ids: {
        type: Array,
        default: []
    }

})

const LabelModel = mongoose.model('LabelModel', LabelModelSchema);

module.exports = LabelModel;