const express = require('express');
const { login } = require('./controladores/login');
const { cadastrarUsuario, obterPerfilUsuario, atualizarUsuario } = require('./controladores/usuario');
const { filtroAutenticacao } = require('./intermediarios/autenticacao');
const schemaUsuario = require('./validacoes/schemaUsuario');
const validarCorpoRequisicao = require('./intermediarios/validarCorpoRequisicao');
const validarLogin = require('./intermediarios/validarLogin');
const schemaLogin = require('./validacoes/schemaLogin');
const validarAtualizarUsuario = require('./intermediarios/validarAtualizarUsuario');
const schemaAtualizarUsuario = require('./validacoes/schemaAtualizarUsuario');
const { listarCategorias } = require('./controladores/categorias');
const { listarTransacoes, detalharTransacao } = require('./controladores/transacoes');

const rotas= express()

rotas.post('/usuario', validarCorpoRequisicao(schemaUsuario), cadastrarUsuario)
rotas.post('/login', validarLogin(schemaLogin) ,login)

rotas.use(filtroAutenticacao)

rotas.get('/usuario', obterPerfilUsuario)
rotas.put('/usuario', validarAtualizarUsuario(schemaAtualizarUsuario),atualizarUsuario)
rotas.get('/categoria', listarCategorias)
rotas.get('/transacao', listarTransacoes)
rotas.get('/transacao/:id', detalharTransacao)
module.exports = rotas;