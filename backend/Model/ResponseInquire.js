const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 
const Schema = mongoose.Schema;

const ResponseInquireSchema = new Schema({
    response_id: {
        type: String,
        unique: true,  
        required: true,
    },
    inquire_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Inquire'
    },
    response: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now, 
    }
});

ResponseInquireSchema.pre('save', function (next) {
    if (!this.response_id || this.isNew) {
        this.response_id = 'RES-' + uuidv4().slice(0, 8).toUpperCase();
    }
    next();
});

const ResponseInquire = mongoose.model('ResponseInquire', ResponseInquireSchema);
module.exports = ResponseInquire;
