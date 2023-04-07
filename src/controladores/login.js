const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knex = require("../bancodedados/conexao");

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: `Erro interno: ${error.message}` });
  }

  try {
    const loginUsuario = await knex("usuarios").where("email", email).first();
    if (!loginUsuario) {
      return res.status(400).json("O usuario não foi encontrado");
    }

    const usuario = loginUsuario;
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res
        .status(400)
        .json({ mensagem: "Email ou senha estão incorretas" });
    }

    const token = jwt.sign({ id: usuario.id }, "senhaSeguraParaToken", {
      expiresIn: "48h",
    });

    const { senha: _, ...dadosUsuario } = usuario;

    return res.status(200).json({
      usuario: dadosUsuario,
      token,
    });
  } catch (error) {
    return res.status(500).json({ mensagem: `Erro interno: ${error.message}` });
  }
};

module.exports = {
  login,
};
