const mongoose = require('../../database/index')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    nome:{
        type:String,
        require:true
    },
    email:{
type:String,
 unique:true,
require:true,
lowercase:true // forçar tudo em minuscula
    },
    password:{
        type:String,
        required:true,
        select:false //nao vir a informação da senha no array de users
    },
    createdAt:{
        type:Date,
        default:Date.now
    }


});
 //antes de salvar o user incripita a senha
UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password,10);
    this.password=hash;
    next();
})

const User = mongoose.model('User',UserSchema);

module.exports=User;