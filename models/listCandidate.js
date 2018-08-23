const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listCandidateSchema = Schema({
    year: Number,
    candidate: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    education: {
        schoolName: String,
        fieldOfStudy: String,
        grade: String,
        startDate: Date,
        endDate: Date
    },
    
});

const Company = module.exports = mongoose.model('ListCandidate', listCandidateSchema);