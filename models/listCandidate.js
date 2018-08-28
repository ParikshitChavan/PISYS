const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listCandidateSchema = Schema({
    year: Number,
    candidate: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    education: {
        schoolName: String,
        fieldOfStudy: String,
        grade: String,
        startDate: Date,
        endDate: Date
    },
    isVeg: String,
    IntnshpExp: String,
    skls: [String],
    skpId: String,            //skypeId
    cmt: String,             //interviewer comment
    aval: String,            //availability for internship
    tchScr: String,           //technical assessment score
    homeTown: String,
    familyBack: String,
    hobbies: String            //hobbies and interests
});

const Company = module.exports = mongoose.model('ListCandidate', listCandidateSchema);

//addSeason()
//addCandidate()
//removeCandidate()

/*Function for update in the CVBuilder*/
// updateEducation()
// updateSkls()
//updateSkypeId()