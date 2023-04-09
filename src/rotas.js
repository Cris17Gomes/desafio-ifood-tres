const express = require('express');

const { login } = require('./controladores/login');
const { cadastrarUsuario, obterPerfilUsuario, atualizarUsuario } = require('./controladores/usuario');
const { filtroAutenticacao } = require('./intermediarios/autenticacao');
const { listarCategorias } = require('./controladores/categorias');
const { listarTransacoes, detalharTransacao, cadastrarTransacao, atualizarTransacao, excluirTransacao, consultarExtrato } = require('./controladores/transacao');

const validarSchema = require('./intermediarios/validarSchema');

const schemaUsuario = require('./validacoes/schemaUsuario');
const schemaLogin = require('./validacoes/schemaLogin');
const schemaAtualizarUsuario = require('./validacoes/schemaAtualizarUsuario');
const schemaCadastrarTransacao = require('./validacoes/schemaCadastrarTransacao');

const rotas= express()

rotas.post('/usuario', validarSchema(schemaUsuario), cadastrarUsuario)
rotas.post('/login', validarSchema(schemaLogin) ,login)

rotas.use(filtroAutenticacao)

rotas.get('/usuario', obterPerfilUsuario)
rotas.put('/usuario', validarSchema(schemaAtualizarUsuario),atualizarUsuario)
rotas.get('/categoria', listarCategorias)
rotas.get('/transacao', listarTransacoes)
rotas.get('/transacao/extrato', consultarExtrato)
rotas.get('/transacao/:id', detalharTransacao)
rotas.post('/transacao', validarSchema(schemaCadastrarTransacao), cadastrarTransacao )
rotas.put('/transacao/:id', validarSchema(schemaCadastrarTransacao), atualizarTransacao)
rotas.delete('/transacao/:id', excluirTransacao)

module.exports = rotas;