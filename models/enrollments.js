const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    userName:{
        type: String,
        required:true
    },
    classNumber:{
        type: String,
        required:true
    },
    userId:{
        type: String,
        required:true
    },
    classId:{
        type: String,
        required:true
    },
    phone:{
        type: String,
        required: true,
    }
      
})

module.exports = mongoose.model('Enollments', enrollmentSchema)