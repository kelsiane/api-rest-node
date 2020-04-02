const mongoose = require('../../database/index')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    project: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project',
        require:true
    },
    //tarefa atribuida a alguem
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
      ref:'User',  
        require:true //nao vir a informação da senha no array de users
    },
    completed:{
        type:Boolean,
        require:true,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }


});
const Task = mongoose.model('Task',UserSchema);

module.exports=Task;