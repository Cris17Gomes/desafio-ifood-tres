const joi = require('joi')

const schemaAtualizarUsuario = joi.object({
    nome: joi.string().required().regex(/^([A-Z][a-z]+)(\s[A-Z][a-z]+)*$/).messages({
        'string.pattern.base': 'O nome deve começar com uma letra maiúscula, seguida de letras minúsculas e opcionalmente espaços em branco, seguido de outra letra maiúscula e letras minúsculas',
        'string.min': 'O nome precisa ter no mínimo 3 caracteres',
        'any.required': 'O campo nome é obrigatório',
        'string.base': 'O nome não pode ser números',
        'string.empty': 'O nome não pode ser vazio'
    }),
    email: joi.string().email().required().messages({
        'string.email': 'Email inválido',
        'any.required': 'O campo email é obrigatório',
        'string.empty': 'O email não pode ser vazio'}),
    senha: joi.string().min(5).required().pattern(/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Za-z])(?=.*\d).{5,}$/).messages({
        'any.required': 'O campo senha é obrigatório',
        'string.min': 'A senha precisa ter no mínimo 5 caracteres',
        'string.empty': 'O senha não pode ser vazio',
        'string.pattern.base': 'A senha deve conter pelo menos 1 caractere especial, 1 letra e 1 número, e ter no mínimo 5 caracteres',
    }),
  });

  module.exports = schemaAtualizarUsuario;