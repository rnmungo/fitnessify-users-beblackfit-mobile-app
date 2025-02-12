import { AuthStatus } from "../interfaces/session";

export const AUTH_STATUS: Record<string, AuthStatus> = Object.freeze({
  AUTHENTICATED: 'authenticated',
  CHECKING: 'checking',
  UNAUTHENTICATED: 'unauthenticated',
});
