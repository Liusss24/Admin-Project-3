import { httpRequest, httpMethod } from '@/shared/api/http-client';
import { apiRoute } from '@/shared/api/api-routes';
import type { LoginCredentials, TokenPair } from './auth.types';

interface TokenDto {
  access: string;
  refresh: string;
}

export async function obtainToken(
  credentials: LoginCredentials,
): Promise<TokenPair> {
  const dto = await httpRequest<TokenDto>(apiRoute.tokenObtain, {
    method: httpMethod.POST,
    auth: false,
    body: {
      username: credentials.username,
      password: credentials.password,
    },
  });
  return { accessToken: dto.access, refreshToken: dto.refresh };
}
