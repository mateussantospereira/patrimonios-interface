const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class registroAssistence {
    async createSession(req) {
        const expires = new Date(Date.now() + 60 * 60 * 1000); // 60 * 60 * 1000 = 1 hora
        return req.session.sess = {
            path: '/', _expires: expires,
            originalMaxAge: expires,
            httpOnly: true
        };
    }

    async createToken(registro) {
        return jwt.sign(
            { session: true, nome: registro.nome },
            process.env.SECRET,
            { expiresIn: 1800 } // 3600 = 1 hora
        );
    }

    async createPassword(senha) {
        return await bcrypt.hash(senha, 8);
    }
}

module.exports = new registroAssistence;