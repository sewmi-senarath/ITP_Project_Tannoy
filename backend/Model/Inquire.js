const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Schema = mongoose.Schema;

const InquireSchema = new Schema({
    inquire_id: {
        type: String,
        unique: true,  
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    responded: {
        type: Boolean,
        required: true,
        default: false,
    },
    satisfaction: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'Pending',
    },
});

// Ensure inquire_id is always generated before saving
InquireSchema.pre('save', function (next) {
    console.log('Running pre-save hook for inquire_id generation...');
    
    if (!this.inquire_id || this.isNew) {
        this.inquire_id = 'INQ-' + uuidv4().slice(0, 8).toUpperCase();
        console.log(`Generated inquire_id: ${this.inquire_id}`);
    }
    
    next();
});


const Inquire = mongoose.model('Inquire', InquireSchema);
module.exports = Inquire;
