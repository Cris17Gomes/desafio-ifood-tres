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
const cadastrarTransacao = async (req, res) => {
  const { usuario } = req;
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  try {
    const categoria = await knex('categorias').where({ id: categoria_id }).first();

    if (!categoria) {
      return res.status(404).json({ mensagem: `Categoria não encontrada` });
    }

    const transacao = await knex('transacoes').insert({
      descricao,
      valor,
      data,
      categoria_id,
      tipo,
      usuario_id: usuario.id,
    }).returning('*');

    if (!transacao) {
      return res.status(500).json({ mensagem: `Erro interno` });
    }

    transacao[0].categoria_nome = categoria.descricao;

    return res.status(201).json(transacao[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: `Erro interno: ${error.message}` });
  }
};

const atualizarTransacao = async (req, res) => {
  const { id } = req.params;
  const { usuario } = req;
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  try {
    const transacao = await knex('transacoes').where({ id: id, usuario_id: usuario.id }).first();

    if (!transacao) {
      return res.status(404).json({ mensagem: `Transação não encontrada` });
    }

    const categoria = await knex('categorias').where({ id: categoria_id }).first();

    if (!categoria) {
      return res.status(404).json({ mensagem: `Categoria não encontrada` });
    }

    const numTransacoesAtualizadas = await knex('transacoes')
      .where({ id: id, usuario_id: usuario.id })
      .update({ descricao, valor, data, categoria_id, tipo });

    if (numTransacoesAtualizadas <= 0) {
      return res.status(500).json({ mensagem: `Erro interno: ${error.message}` });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensagem: `Erro interno: ${error.message}` });
  }
};


const excluirTransacao = async (req, res) => {
  const { id } = req.params;
  const { usuario } = req;

  try {
    const transacao = await knex('transacoes').where({ id, usuario_id: usuario.id }).first();

    if (!transacao) {
      return res.status(404).json({ mensagem: `Transação não encontrada` });
    }

    await knex('transacoes').where({ id, usuario_id: usuario.id }).delete();

    return res.status(204).send();

  } catch (error) {
    return res.status(500).json({ mensagem: `Erro interno: ${error.message}` });
  }

};

const consultarExtrato = async (req, res) => {
  const { usuario } = req;
  try {
    const saldoEntrada = await knex('transacoes')
      .sum('valor as saldo')
      .where({ usuario_id: usuario.id, tipo: 'entrada' })
      .first();
    const saldoSaida = await knex('transacoes')
      .sum('valor as saldo')
      .where({ usuario_id: usuario.id, tipo: 'saida' })
      .first();

    return res.status(200).json({
      entrada: Number(saldoEntrada.saldo) ?? 0,
      saida: Number(saldoSaida.saldo) ?? 0
    });

  } catch (error) {
    return res.status(500).json({ mensagem: `Erro interno: ${error.message}` });
  } 
};

module.exports = {
  listarTransacoes,
  detalharTransacao,
  cadastrarTransacao,
  atualizarTransacao,
  excluirTransacao,
  consultarExtrato,
};
