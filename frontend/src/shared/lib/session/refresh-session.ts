import { API_BASE_URL } from '@/shared/api/api-config';
import { apiRoute } from '@/shared/api/api-routes';
import { clearSession, getSessionSnapshot, setSession } from './session-store';

interface RefreshDto {
  access: string;
}

let inFlight: Promise<boolean> | null = null;

// Single-flight refresh: concurrent 401s share one refresh request. Uses raw
// fetch (not httpRequest) to avoid a circular dependency with the http client.
export function refreshSession(): Promise<boolean> {
  if (!inFlight) {
    inFlight = runRefresh().finally(() => {
      inFlight = null;
    });
  }
  return inFlight;
}

async function runRefresh(): Promise<boolean> {
  const { refreshToken } = getSessionSnapshot();
  if (!refreshToken) {
    clearSession();
    return false;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${apiRoute.tokenRefresh}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      clearSession();
      return false;
    }

    const data = (await response.json()) as RefreshDto;
    setSession({ accessToken: data.access, refreshToken });
    return true;
  } catch {
    clearSession();
    return false;
  }
}
