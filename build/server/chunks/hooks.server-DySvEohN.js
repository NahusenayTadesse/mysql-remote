import { s as sessionCookieName, v as validateSessionToken, a as setSessionTokenCookie, d as deleteSessionTokenCookie } from './auth-CazrXHF0.js';
import 'drizzle-orm';
import '@oslojs/crypto/sha2';
import '@oslojs/encoding';
import 'drizzle-orm/mysql2';
import 'mysql2/promise';
import 'drizzle-orm/mysql-core';
import './index-CCyR2w2-.js';

const handleAuth = async ({ event, resolve }) => {
  const sessionToken = event.cookies.get(sessionCookieName);
  if (!sessionToken) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }
  const { session, user } = await validateSessionToken(sessionToken);
  if (session) {
    setSessionTokenCookie(event, sessionToken, session.expiresAt);
  } else {
    deleteSessionTokenCookie(event);
  }
  event.locals.user = user;
  event.locals.session = session;
  return resolve(event);
};
const handle = handleAuth;

export { handle };
//# sourceMappingURL=hooks.server-DySvEohN.js.map
