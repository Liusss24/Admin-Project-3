import { obtainToken } from '@/entities/auth/model/auth.repository';
import { setSession } from '@/shared/lib/session/session-store';
import { HttpError } from '@/shared/api/http-client';
import { submitOutcome } from './login.constants';
import type { LoginValues } from './login.types';

const HTTP_UNAUTHORIZED = 401;

export type LoginResult =
  | { kind: typeof submitOutcome.SUCCESS }
  | { kind: typeof submitOutcome.INVALID_CREDENTIALS }
  | { kind: typeof submitOutcome.UNKNOWN_ERROR };

export async function submitLogin(values: LoginValues): Promise<LoginResult> {
  try {
    const tokens = await obtainToken({
      username: values.username.trim(),
      password: values.password,
    });
    setSession({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
    return { kind: submitOutcome.SUCCESS };
  } catch (error) {
    if (error instanceof HttpError && error.status === HTTP_UNAUTHORIZED) {
      return { kind: submitOutcome.INVALID_CREDENTIALS };
    }
    return { kind: submitOutcome.UNKNOWN_ERROR };
  }
}
