import { getSessionSnapshot } from '@/shared/lib/session/session-store';

const DEFAULT_API_BASE_URL = 'http://localhost:8000';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_BASE_URL;

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

export async function httpRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = httpMethod.GET, body, signal, auth = true } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: buildHeaders(auth),
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  });

  const contentType = response.headers.get('content-type') ?? '';
  const payload = contentType.includes('application/json')
    ? await response.json()
    : null;

  if (!response.ok) {
    throw new HttpError(response.status, payload);
  }

  return payload as T;
}
