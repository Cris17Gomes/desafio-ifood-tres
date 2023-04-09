const joi = require('joi')

const schemaCadastrarTransacao = joi.object({
      descricao: joi.string().required().messages({
        'string.pattern.base': 'O nome deve começar com uma letra maiúscula, seguida de letras minúsculas e opcionalmente espaços em branco, seguido de outra letra maiúscula e letras minúsculas',
        'string.min': 'O nome precisa ter no mínimo 3 caracteres',
        'any.required': 'O campo nome é obrigatório',
        'string.base': 'O nome não pode ser números',
        'string.empty': 'O nome não pode ser vazio'
    }),
      valor: joi.number().required().messages({ 
        'number.base': 'O campo valor precisa ser um número',
        'any.required': 'O campo valor é obrigatório'
    }),
      data: joi.date().required().messages({
        'date.base': 'O campo data precisa ser uma data válida',
        'any.required': 'O campo data é obrigatório'
    }),
      categoria_id: joi.number().required().messages({
        'number.base': 'O campo categoria_id precisa ser um número',
        'any.required': 'O campo categoria_id é obrigatório'
    }),
      tipo: joi.string().valid('entrada', 'saída').required().messages({
        'any.required': 'O campo tipo é obrigatório',
        'any.only': 'O campo tipo deve ser entrada ou saida'
      }),

    });

module.exports = schemaCadastrarTransacao