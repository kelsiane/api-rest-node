const mongoose = require('../../database/index')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true //nao vir a informação da senha no array de users
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]


});

const Project = mongoose.model('Project', UserSchema);

module.exports = Project;