const joi = require('joi')

const schemaLogin = joi.object({
 
    email: joi.string().email().required().messages({
        'string.email': 'Email inválido',
        'any.required': 'O campo email é obrigatório',
        'string.empty': 'O email não pode ser vazio'}),

    senha: joi.string().min(5).required().pattern(/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Za-z])(?=.*\d).{5,}$/).messages({
        'any.required': 'O campo senha é obrigatório',
        'string.min': 'A senha precisa ter no mínimo 5 caracteres',
        'string.empty': 'O senha não pode ser vazio',
        'string.pattern.base': 'A senha deve conter pelo menos 1 caractere especial, 1 letra e 1 número, e ter no mínimo 5 caracteres',
    })
})

module.exports = schemaLogin