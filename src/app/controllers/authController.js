const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const User = require('../models/User');
const authConfig = require('../../config/auth')
const router = express.Router();

//Function token

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,

    })
}
//Criar User
router.post('/register', async function (req, res) {
    const {
        email
    } = req.body;
    try {
        //procurar um user pelo email se ele exitir retorna erro
        if (await User.findOne({
                email
            })) {
            return res.status(400).send("Email ja existe");
        }
        //todos os parametros ta em req.body
        const user = await User.create(req.body);
        //nao mostrar a senha na resposta
        user.password = undefined;
        return res.send({
            user,
            token: generateToken({
                id: user.id
            }),
        })
    } catch (erro) {
        return res.status(400).send("Houve um erro " + erro);
    }

});


router.post('/authenticate', async function (req, res) {
    const {
        email,
        password
    } = req.body;
    const user = await User.findOne({
        email
    }).select('+password');
    if (!user) {
        return res.status(400).send("Usuário não encontrado!");
    }
    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send("Senha invalida!");
    }
    user.password = undefined;

    return res.send({
        user,
        token: generateToken({
            id: user.id
        }),
    });
});
//Mostrar Users
router.get('/get', async function (req, res) {
    const user = await User.find();
    res.send({
        user
    });

})
//toda vez que o user acessar /auth(prefixo) ele chama a router ex auth/register
module.exports = function (app) {
    app.use('/auth', router)
}