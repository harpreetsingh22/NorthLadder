import * as Stream from 'stream';
import * as Http from 'http';
import Wreck from '@hapi/wreck';

type Payload = string | Buffer | Stream.Readable | object;

const DEFAULT_TIMEOUT_IN_MILLISECONDS = 5000;

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

export type HttpClientResponse<T> = {
  statusCode: number;
  body: T;
  headers: Http.IncomingHttpHeaders;
};

async function Request<T>(
  method: string,
  url: string,
  headers: Record<string, string>,
  payload?: Payload,
  timeout?: number,
): Promise<HttpClientResponse<T>> {
  const response: Http.IncomingMessage = await Wreck.request(method, url, {
    headers: { ...DEFAULT_HEADERS, ...headers },
    payload,
    gunzip: true,
    timeout: timeout || DEFAULT_TIMEOUT_IN_MILLISECONDS,
  });
  const body: T = await Wreck.read(response, { gunzip: true, json: true });
  return {
    statusCode: response.statusCode,
    body,
    headers: response.headers,
  };
}

export async function Get<T>(
  url: string,
  headers?: Record<string, string>,
  timeout?: number,
): Promise<HttpClientResponse<T>> {
  return Request<T>('GET', url, headers, undefined, timeout);
}

export async function Post<T>(
  url: string,
  headers: Record<string, string>,
  payload: Payload,
  timeout?: number,
): Promise<HttpClientResponse<T>> {
  return Request<T>('POST', url, headers, payload, timeout);
}

export async function Put<T>(
  url: string,
  headers: Record<string, string>,
  payload: Payload,
): Promise<HttpClientResponse<T>> {
  return Request<T>('PUT', url, headers, payload);
}

export async function Patch<T>(
  url: string,
  headers: Record<string, string>,
  payload: Payload,
): Promise<HttpClientResponse<T>> {
  return Request<T>('PATCH', url, headers, payload);
}

export async function Delete<T>(
  url: string,
  headers: Record<string, string>,
): Promise<HttpClientResponse<T>> {
  return Request<T>('DELETE', url, headers);
}
