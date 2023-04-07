const knex = require('../bancodedados/conexao')
const jwt = require('jsonwebtoken')
require("dotenv").config();

const filtroAutenticacao = async (req, res, next) => {
    const {authorization} = req.headers

    if (!authorization) {
        return res.status(401).json({mensagem: 'Não autorizado'})
    }

    try {
        const token = authorization.replace('Bearer ', '').trim()
        const { id } = jwt.verify(token, "senhaSeguraParaToken")

        const loginUsuario = await knex("usuarios").where("id", id).first();
        if (!loginUsuario) {
          return res.status(401).json({mensagem: 'Não autorizado'});
        }

        const { senha: _, ...dadosUsuario } = loginUsuario

        req.usuario = dadosUsuario
        next()

    } catch (error) {
        return res.status(500).json({ mensagem: `Erro interno: ${error.message}` });
    }
}
module.exports = {filtroAutenticacao}