class registroField {
    async validar() {
        return {
            email: { nome: "E-mail", max: 60 },
            senha: { nome: "Senha", max: 20 }
        };
    }

    async criar() {
        return {
            nome: { nome: "Nome", min: 10, max: 60, ndc: ["especiais", "numeros"] },
            email: { nome: "E-mail", min: 12, max: 60, obg: ["@", "."], ndc: ["especiais"] },
            senha: { nome: "Senha", min: 5, max: 20 }
        };
    }

    async atualizar() {
        const fieldsCriar = await this.criar();
        const fields = Object.assign(fieldsCriar, {
            senha: { nome: "Senha", max: 20 },
            novaSenha: { nome: "Nova senha", min: 5, max: 20, null: true }
        });
        return fields;
    }
}

module.exports = new registroField;