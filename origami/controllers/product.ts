import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi';
import { logger, handleDBError, prepareResponse, productNotFoundError } from '@utilities';
import { ProductCreationPayload, ProductUpdationPayload } from '@interfaces/product';

// eslint-disable-next-line import/prefer-default-export
export const createProduct = async (
  request: Request,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const payload = request.payload as ProductCreationPayload;
  const { productService } = request.services();
  const { traceId } = request.pre;
  try {
    const productInfo = {
      ...payload,
    };
    const product = await productService.createProduct({ productInfo });
    return h
      .response(
        prepareResponse({
          success: true,
          data: {
            product,
          },
        }),
      )
      .code(201);
  } catch (err) {
    logger.error(`traceId=${traceId} createProduct error=${err.message}`, err);
    throw handleDBError({ err });
  }
};

export const updateProduct = async (
  request: Request,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const payload = request.payload as ProductUpdationPayload;
  const { id: productId } = request.params;
  const { productService } = request.services();
  const { traceId } = request.pre;
  try {
    const product = await productService.findProductById({ id: Number(productId) });
    if (!product) {
      throw productNotFoundError(productId);
    }
    const productInfo = {
      ...payload,
    };
    await productService.updateProduct({ id: Number(productId), productInfo });
    return h.response(
      prepareResponse({
        success: true,
        data: {},
      }),
    );
  } catch (err) {
    logger.error(`traceId=${traceId} updateProduct error=${err.message}`, err);
    throw handleDBError({ err });
  }
};

export const getProductById = async (
  request: Request,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const { id: productId } = request.params;
  const { productService } = request.services();
  const { traceId } = request.pre;
  try {
    const product = await productService.findProductById({ id: Number(productId) });
    if (!product) {
      throw productNotFoundError(productId);
    }
    return h.response(
      prepareResponse({
        success: true,
        data: {
          product,
        },
      }),
    );
  } catch (err) {
    logger.error(`traceId=${traceId} getProductById error=${err.message}`, err);
    throw handleDBError({ err });
  }
};

export const deleteProductById = async (
  request: Request,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const { id: productId } = request.params;
  const { productService } = request.services();
  const { traceId } = request.pre;
  try {
    const product = await productService.findProductById({ id: Number(productId) });
    if (!product) {
      throw productNotFoundError(productId);
    }
    await productService.deleteProductById({ id: Number(productId) });
    return h.response(
      prepareResponse({
        success: true,
        data: {},
      }),
    );
  } catch (err) {
    logger.error(`traceId=${traceId} deleteProductById error=${err.message}`, err);
    throw handleDBError({ err });
  }
};

export const getProducts = async (
  request: Request,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const { category, productName, page, limit } = request.query;
  const { productService } = request.services();
  const { traceId } = request.pre;
  try {
    const data = await productService.findByFields({ category, productName, page, limit });
    return h.response(
      prepareResponse({
        success: true,
        data,
      }),
    );
  } catch (err) {
    logger.error(`traceId=${traceId} deleteProductById error=${err.message}`, err);
    throw handleDBError({ err });
  }
};
