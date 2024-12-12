import Boom from '@hapi/boom';
import * as nanoid from 'nanoid';
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
  names,
  NumberDictionary,
} from 'unique-names-generator';

const { customAlphabet } = nanoid;
const nanoIdAlphanumericCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const isLocal = () => process.env.NODE_ENV === 'development';

export const isProduction = () =>
  process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod';

export const env = <T>(envName: string, defaultValue: T): T | string =>
  process.env[envName] || defaultValue;

export const catBoxRedisCacheName = env('SERVICE_NAME', 'r');

export const catBoxInMemoryCacheName = `${env('SERVICE_NAME', 'r')}_i`;

export const generateCustomId = () => {
  const customId = customAlphabet(nanoIdAlphanumericCharset);
  return customId();
};

// to be used with small array only
// bad performance with Big array
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
const usernameDictionaries = [adjectives, names, animals, colors];

export const generateUniqueUsername = () => {
  const [dictionaryOne, dictionaryTwo] = shuffleArray(usernameDictionaries);
  return uniqueNamesGenerator({
    dictionaries: [
      dictionaryOne,
      dictionaryTwo,
      NumberDictionary.generate({ min: 100, max: 999999 }),
    ], // colors can be omitted here as not used
    length: 3,
    style: 'lowerCase',
    separator: '_',
  });
};

export const failAction = async (request, h, err) => {
  throw Boom.badRequest(err.message, err);
};

export const getInterpolatedKey = (str: string = '', options: object = {}) =>
  str.replace(/\{(\w+)\}/g, (_, key) => (options[key] ? options[key] : `{${key}}`));

export const formatPrice = (price: string | number): number => {
  if (typeof price === 'number') {
    return Number.parseFloat(price.toFixed(2));
  }
  return Number.parseFloat(Number.parseFloat(price).toFixed(2));
};

export const getEpochTimeInSeconds = (dateTime?: string): number => {
  const date = dateTime ? new Date(dateTime) : new Date();
  return Math.floor(date.getTime() / 1000);
};

export function getIsoStringFromEpochSeconds(epochSeconds: number): string {
  return new Date(epochSeconds).toISOString();
}

export function addMinutesToDate(date: string, minutes: number): string {
  const dt = new Date(date);
  dt.setMinutes(dt.getMinutes() + minutes);
  const dateString = dt.toISOString();
  return dateString;
}

export function addMinutesToEpochSeconds(epochSeconds: number, minutes: number): number {
  const dt = new Date(1000 * epochSeconds);
  dt.setMinutes(dt.getMinutes() + minutes);
  const dateString = Math.floor(dt.getTime() / 1000);
  return dateString;
}

export const decimalNumberSum = (x: number, y: number, decimalPlaces = 4) => {
  const factor = 10 ** decimalPlaces;
  return (x * factor + y * factor) / factor;
};

export const decimalNumberSubtract = (x: number, y: number, decimalPlaces = 4) => {
  const factor = 10 ** decimalPlaces;
  return (x * factor - y * factor) / factor;
};
