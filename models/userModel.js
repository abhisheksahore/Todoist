const mongoose = require('mongoose');

const UserModelSchema = new mongoose.Schema ({
    "username": {
        type: String,
        required: true
    },
    "password": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true
    },
    "preferences": {
        "theme": {
            type: String,
            default: `light`
        },
        "date_time_format": {
            "time_zone": {
                type: String,
                default: `(GMT+0530) Asia/Kolkata`
            },
            "date_format": {
                type: String,
                default: 'yyyy-MM-dd'
            },
            "time_format": {
                type: String,
                default: 'HH:mm'
            }
        },
        "reminder_prefs": {
            "via_email": {
                type: Boolean,
                default: true
            },
            "via_desktop": {
                type: Boolean,
                default: false
            },
            "should_remind": {
                type: Boolean,
                required: true,
                default: false
            },
            "remind_before": {
                type: Date
            }
        }
    }
})

const UserModel = mongoose.model('UserModel', UserModelSchema);
module.exports = UserModel;