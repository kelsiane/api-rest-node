const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send("Token não encontrado!")
    }
    const parts = authHeader.split(' ');

    if (!parts.length === 2) {
        return res.status(401).send("Erro de Token!");
    }
    const [scheme, token] = parts;

    //regex buscando Bearer
    // $ termina i-> case insensitve
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send("Erro, token mal formado");
    }

    //verificar token
    jwt.verify(token, authConfig.secret, (function (err, decoded) {
        if (err) {
            return res.status(401).send("Erro: Token invalido");
        }
        req.userId=decoded.id;
        return next();
    }))
};