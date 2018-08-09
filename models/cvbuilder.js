const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;

const Schema = mongoose.Schema;

const cvBuilderSchema = Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    address: String,
    skypeId: String,
    skills : {
        techSkills : [{
            _id: String,
            name: String
        }],
        otherSkills : [{
            _id: String,
            name: String
        }],
        languageSkills : [{
            _id: String,
            name: String
        }]
    },
    educations: [{
        _id: String,
        schoolName: String,
        fieldOfStudy: String,
        grade: String,
        startDate: Date,
        endDate: Date
    }],
    projects : [{
        _id: String,
        title: String,
        description: String,
        teamSize: Number,
        responsibilities : String,
        usedSkills: [],
        startDate: Date,
        endDate: Date
    }],
    experience: [{
        _id: String,
        title: String,
        description: String,
        usedSkills: [],
        startDate: Date,
        endDate: Date,
        active: Boolean
    }],
    certifications :[{
        _id: String,
        title: String,
        link: String
    }],
    personalInterest: {
        hobbies: String,
        motivation: String
    },
    remarks: String
});

const cvBuilder = module.exports = mongoose.model('CvBuilder', cvBuilderSchema);

module.exports.getCvById = (id, callback) => {
    cvBuilder.findById(id,callback);
}

module.exports.createCv = (userId, callback) => {
    const userCv = new cvBuilder({ user : userId });
    userCv.save(callback);
}

// add records
module.exports.addEducation = (id,newEducation,callback) => {
    newEducation._id = new ObjectID();
    cvBuilder.findOneAndUpdate( { _id: id}, { $push : { educations: newEducation } }, {new: true}, callback)
}

module.exports.addExperience = (id,newExperience,callback) => {
    newExperience._id = new ObjectID();
    cvBuilder.findOneAndUpdate( { _id: id}, { $push : { experience: newExperience  } }, {new: true}, callback)
}

module.exports.addProjects = (id,newProjects,callback) => {
    newProjects._id = new ObjectID();
    cvBuilder.findOneAndUpdate( { _id: id}, { $push : { projects: newProjects  } }, {new: true}, callback)
}

// delete records
module.exports.deleteEducation = (id, educationID, callback) => {
    cvBuilder.findOneAndUpdate( { _id: id}, { $pull: { educations: { _id: educationID } } }, {new: true}, callback);
}

module.exports.deleteExperience = (id, experienceId, callback) => {
    cvBuilder.findOneAndUpdate( { _id: id}, { $pull: { experience: { _id: experienceId } } }, {new: true}, callback);
}

module.exports.deleteProject = (id, projectId, callback) => {
    cvBuilder.findOneAndUpdate( { _id: id}, { $pull: { projects: { _id: projectId } } }, {new: true}, callback);
}

// update records
module.exports.updateEducation = (id, education, callback) => {
    cvBuilder.findOneAndUpdate( { _id: id, "educations._id" : education._id},
        { $set: { "educations.$" : education } }, { new: true}, 
        callback);
}

module.exports.updateExperience = (id, experience, callback) => {
    cvBuilder.findOneAndUpdate( { _id: id, "experience._id" : experience._id},
        { $set: { "experience.$" : experience } }, { new: true}, 
        callback);
}

module.exports.updateProject = (id, project, callback) => {
    cvBuilder.findOneAndUpdate( { _id: id, "projects._id" : project._id},
        { $set: { "projects.$" : project } }, { new: true}, 
        callback);
}



