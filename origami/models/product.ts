import JoiBase from 'joi';
import JoiDate from '@hapi/joi-date';
import { Model } from '@hapipal/schwifty';

const Joi = JoiBase.extend(JoiDate);

export default class ProductModel extends Model {
  static get tableName() {
    return 'product';
  }

  static get idColumn() {
    return 'id';
  }

  static get joiSchema() {
    return Joi.object({
      id: Joi.number().positive().integer(),
      productName: Joi.string().required(),
      productDescription: Joi.string().required(),
      price: Joi.number().positive().integer(),
      category: Joi.string().required(),
      stockQuantity: Joi.number().required(),
      createdAt: Joi.date().iso(),
      updatedAt: Joi.date().iso(),
    });
  }
}

declare module '@hapipal/schwifty' {
  interface RegisteredModels {
    ProductModel: typeof ProductModel;
  }
}










