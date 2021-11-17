const Joi = require('joi');

const id = Joi.string().uuid();

const name = Joi.string().max(35).min(3);

const createCategorySchema = Joi.object({
  name: name.required(),
})

const updateCategorySchema = Joi.object({
  name: name.required()
})

const getCategorySchema = Joi.object({
  id: id.required()
})

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema };
