const knex = require("../bancodedados/conexao");

const listarTransacoes = async (req, res) => {
  const { usuario } = req;
  try {
    const transacoes = await knex("transacoes").where({
      usuario_id: usuario.id,
    });
    return res.status(200).json(transacoes);
  } catch (error) {
    return res.status(500).json({ mensagem: `Erro interno: ${error.message}` });
  }
};

const detalharTransacao = async (req, res) => {
  const { id } = req.params;
  const { usuario } = req;
  try {
    const transacoes = await knex("transacoes").where({
      usuario_id: usuario.id,
      id: id,
    });

    if (transacoes.length <= 0) {
      return res.status(404).json({ mensagem: `Transação não encontrada` });
    }
    const transacao = transacoes[0];
    return res.status(200).json(transacao);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: `Erro interno: ${error.message}` });
    
  }
  
};

module.exports = {
  listarTransacoes,
  detalharTransacao,
};
