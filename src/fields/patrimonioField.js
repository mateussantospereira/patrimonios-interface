class patrimonioField {
    async criar() {
        return {
            ni: { nome: "Número de inventário", max: 16, number_text: true },
            instituicao: { nome: "Instituição", min: 1, max: 30 },
            tag: { nome: "Tag", min: 1, max: 20 },
            descricao: { nome: "Descrição", min: 1, max: 80 },
            incorporacao: { nome: "Data de incorporação", max: 10, date: true },
            marca: { nome: "Marca", min: 1, max: 20 },
            serie: { nome: "Série", min: 1, max: 40 },
            valor: { nome: "Valor", min: 1, max: 20 },
            sala: { nome: "Sala", min: 1, max: 50 },
            localizacao: { nome: "Local", min: 1, max: 60 },
            ativo: { nome: "Ativo", min: 1, max: 20 },
            obs: { nome: "Observação", min: 1, max: 100 },
        };
    }

    async importar() {
        return {
            kilobyte: 150,
            fields: {
                'NI': { nome: "Número de inventário", max: 16, number_text: true },
                'INSTITUIÇÃO': { nome: "Instituição", min: 1, max: 30 },
                'TAG': { nome: "Tag", min: 1, max: 20 },
                'DESCRIÇÃO': { nome: "Descrição", min: 1, max: 80 },
                'INCORPORAÇÃO': { nome: "Data de incorporação", max: 10, date: "formatar" },
                'MARCA': { nome: "Marca", min: 1, max: 20 },
                'SERIE': { nome: "Série", min: 1, max: 40 },
                'VALOR': { nome: "Valor", min: 1, max: 20 },
                'SALA': { nome: "Sala", min: 1, max: 50 },
                'LOCAL': { nome: "Local", min: 1, max: 60 },
                'ATIVO/BAIXA': { nome: "Ativo", min: 1, max: 20, null: true },
                'OBS': { nome: "Observação", min: 1, max: 100, null: true },
            }
        };
    }

    async exportar() {
        return {
            list: { list: { nome: "Lista de exportação", max: 3000, list: true } },
            head: {
                ni: ['NI'],
                instituicao: ['INSTITUIÇÃO'],
                tag: ['TAG'],
                descricao: ['DESCRIÇÃO'],
                incorporacao: ['INCORPORAÇÃO'],
                marca: ['MARCA'],
                serie: ['SERIE'],
                valor: ['VALOR'],
                sala: ['SALA'],
                localizacao: ['LOCAL'],
                ativo: ['ATIVO/BAIXA'],
                obs: ['OBS'],
            }
        };
    }

    async imprimir() {
        return {
            list: { list: { nome: "Lista de impressão", max: 3000, list: true } },
            options: {
                "height": "29.7cm",
                "width": "21cm",
                "format": "Letter",
                "orientation": "portrait"
            },
            column: 4,
            lines: 10
        };
    }

    async atualizar() {
        const fieldsCriar = await this.criar();
        delete fieldsCriar.ni;

        return fieldsCriar;
    }
}

module.exports = new patrimonioField;