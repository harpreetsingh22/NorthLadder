import Joi from 'joi';

const productCreationPayload = {
  productName: Joi.string().required(),
  productDescription: Joi.string().required(),
  price: Joi.number().positive().integer(),
  category: Joi.string().required(),
  stockQuantity: Joi.number().required(),
};

const productUpdationPayload = {
  productName: Joi.string().required(),
  productDescription: Joi.string().required(),
  price: Joi.number().positive().integer(),
  category: Joi.string().required(),
  stockQuantity: Joi.number().required(),
};

// eslint-disable-next-line import/prefer-default-export
export const productCreationPayloadModel = Joi.object(productCreationPayload);
export const productUpdationPayloadModel = Joi.object(productUpdationPayload);
