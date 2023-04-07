const knex = require("../bancodedados/conexao");

const bcrypt = require("bcrypt");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios" });
  }
  try {
   
    const usuario = await knex("usuarios").where({ email }).first();

    if (usuario) {
      return res
        .status(400)
        .json({ mensagem: "O email já existe cadastrado." });
    }
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuarioCadastrado = await knex("usuarios")
      .insert({
        nome: nome,
        email: email,
        senha: senhaCriptografada,
      })
      .returning("*");

    if (!usuarioCadastrado) {
      return res
        .status(404)
        .json("O usuário não foi cadastrado.");
        
    }
   return res
      .status(201)
      .json({nome, email });
  } catch (error) {
    return res.status(500).json({ mensagem: `Erro interno: ${error.message}` });
  }
};

const obterPerfilUsuario = async (req, res) => {
  return res.json(req.usuario)
}


const atualizarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { usuario } = req;

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios" });
  }
  
  try {
    const usuarioEncontrado = await knex('usuarios')
      .where('email', email)
      .first();
      
    if (usuarioEncontrado && usuarioEncontrado.id !== usuario.id) {
      return res.status(400).json({ mensagem: 'O email já existe cadastrado.' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await knex('usuarios')
      .where('id', usuario.id)
      .update({
        nome,
        email,
        senha: senhaCriptografada,
      });
      
    return res.status(204).send();

  } catch (error) {
    return res.status(500).json({ mensagem: `Erro interno: ${error.message}` });
  }
}



module.exports = {
  cadastrarUsuario,
  obterPerfilUsuario,
  atualizarUsuario
};
