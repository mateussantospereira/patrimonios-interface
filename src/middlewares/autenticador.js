const { checkInputs } = require("../helpers/checkInputs");
const { response } = require("../helpers/response");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const valido = (req, res, next) => {
    const expires = (Date.parse(req.session.sess["_expires"]));
    
    if (expires > Date.now()) {
        next();
    } else {
        res.redirect("/validar");
    }
}

const verificar = ((req, res, next) => {
    if (req.session.sess) {
        valido(req, res, next);
    }
    else {
        res.redirect("/validar");
    }
});


const verificarToken = async (req, res, next) => {
    const fields = { token: { nome: "Token", max: 200 } };

    let resultInputs = checkInputs({ token: req.body.token }, fields);

    if (resultInputs.error == true) {
        response(res, 400, true, resultInputs.message);
        return;
    }

    let token = resultInputs.data.token;

    try {
        const decode = await promisify(jwt.verify)(token, process.env.SECRET);
        next();
    } catch (error) {
        response(res, 400, true, "Token inválido");
    }
};

const validar = ((req, res, next) => {

    if (req.body.token) {
        verificarToken(req, res, next);
    } else {
        if (req.session.sess) {
            valido(req, res, next);
        } else {
            res.redirect("/validar");
        }
    }

});

module.exports = { verificar, validar };