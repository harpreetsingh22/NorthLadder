import { ServerRoute } from '@hapi/hapi';
import { failAction } from '@utilities';
import { productCreationPayloadModel, productUpdationPayloadModel } from '@validators';
import { createProduct, updateProduct, getProductById, deleteProductById, getProducts } from '@controllers/product';
import Joi from 'joi';

const routes: ServerRoute[] = [
  {
    method: 'POST',
    path: '/create/product',
    options: {
      id: 'create-product',
      description: 'Create Product',
      tags: ['product', 'api'],
      validate: {
        payload: productCreationPayloadModel,
        failAction,
      },
      handler: createProduct,
    },
  },
  {
    method: 'PATCH',
    path: '/update/product/{id}',
    options: {
      id: 'update-product',
      description: 'Update Product',
      tags: ['product', 'api'],
      validate: {
        payload: productUpdationPayloadModel,
        params: Joi.object({
          id: Joi.number().required(),
        }),
        failAction,
      },
      handler: updateProduct,
    },
  },
  {
    method: 'GET',
    path: '/product/{id}',
    options: {
      id: 'get-product-by-id',
      description: 'Get Product By Id',
      tags: ['product', 'api'],
      validate: {
        params: Joi.object({
          id: Joi.number().required(),
        }),
        failAction,
      },
      handler: getProductById,
    },
  },
  {
    method: 'DELETE',
    path: '/product/{id}',
    options: {
      id: 'delete-product-by-id',
      description: 'Delete Product By Id',
      tags: ['product', 'api'],
      validate: {
        params: Joi.object({
          id: Joi.number().required(),
        }),
        failAction,
      },
      handler: deleteProductById,
    },
  },
  {
    method: 'GET',
    path: '/products',
    options: {
      id: 'get-products',
      description: 'Get',
      tags: ['product', 'api'],
      validate: {
        query: Joi.object({
          category: Joi.string(),
          productName: Joi.string(),
          page: Joi.number(),
          limit: Joi.number(),
        }),
        failAction,
      },
      handler: getProducts,
    },
  },
];

export default routes;
