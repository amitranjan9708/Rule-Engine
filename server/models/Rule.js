const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
    ruleId: {
        type: String,   // Use String if you want to control it, otherwise you could omit this
        default:1 // Use UUID for better readability or you can assign Mongo's _id here
    },
    ruleString: {
        type: String,
        required: true
    },
    ast: {
        type: Object,
        required: true
    }
});

const Rule = mongoose.model('Rule', ruleSchema);

module.exports = Rule;
