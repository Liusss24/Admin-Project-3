import { getSessionSnapshot } from '@/shared/lib/session/session-store';
import { refreshSession } from '@/shared/lib/session/refresh-session';
import { API_BASE_URL } from './api-config';

const HTTP_UNAUTHORIZED = 401;

export const httpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

export type HttpMethod = (typeof httpMethod)[keyof typeof httpMethod];

export interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  signal?: AbortSignal;
  auth?: boolean;
}

export class HttpError extends Error {
  readonly status: number;
  readonly payload: unknown;

  constructor(status: number, payload: unknown) {
    super(`HTTP ${status}`);
    this.name = 'HttpError';
    this.status = status;
    this.payload = payload;
  }
}

function buildHeaders(useAuth: boolean): Headers {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  if (useAuth) {
    const { accessToken } = getSessionSnapshot();
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
  }
  return headers;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type') ?? '';
  const payload = contentType.includes('application/json')
    ? await response.json()
    : null;

  if (!response.ok) {
    throw new HttpError(response.status, payload);
  }

  return payload as T;
}

export async function httpRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = httpMethod.GET, body, signal, auth = true } = options;
  const url = `${API_BASE_URL}${path}`;
  const serializedBody = body === undefined ? undefined : JSON.stringify(body);

  let response = await fetch(url, {
    method,
    headers: buildHeaders(auth),
    body: serializedBody,
    signal,
  });

  // On an expired access token, try a single transparent refresh + retry.
  if (response.status === HTTP_UNAUTHORIZED && auth) {
    const refreshed = await refreshSession();
    if (refreshed) {
      response = await fetch(url, {
        method,
        headers: buildHeaders(auth),
        body: serializedBody,
        signal,
      });
    }
  }

  return parseResponse<T>(response);
}
