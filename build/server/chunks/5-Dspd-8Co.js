import { hash, verify } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { f as fail, r as redirect } from './index-CCyR2w2-.js';
import { eq } from 'drizzle-orm';
import { b as db, u as user, g as generateSessionToken, c as createSession, a as setSessionTokenCookie } from './auth-CazrXHF0.js';
import '@oslojs/crypto/sha2';
import 'drizzle-orm/mysql2';
import 'mysql2/promise';
import 'drizzle-orm/mysql-core';

const load = async (event) => {
  if (event.locals.user) {
    return redirect(302, "/demo/lucia");
  }
  return {};
};
const actions = {
  login: async (event) => {
    const formData = await event.request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
    if (!validateUsername(username)) {
      return fail(400, {
        message: "Invalid username (min 3, max 31 characters, alphanumeric only)"
      });
    }
    if (!validatePassword(password)) {
      return fail(400, { message: "Invalid password (min 6, max 255 characters)" });
    }
    const results = await db.select().from(user).where(eq(user.username, username));
    const existingUser = results.at(0);
    if (!existingUser) {
      return fail(400, { message: "Incorrect username or password" });
    }
    const validPassword = await verify(existingUser.passwordHash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1
    });
    if (!validPassword) {
      return fail(400, { message: "Incorrect username or password" });
    }
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, existingUser.id);
    setSessionTokenCookie(event, sessionToken, session.expiresAt);
    return redirect(302, "/demo/lucia");
  },
  register: async (event) => {
    const formData = await event.request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
    if (!validateUsername(username)) {
      return fail(400, { message: "Invalid username" });
    }
    if (!validatePassword(password)) {
      return fail(400, { message: "Invalid password" });
    }
    const userId = generateUserId();
    const passwordHash = await hash(password, {
      // recommended minimum parameters
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1
    });
    try {
      await db.insert(user).values({ id: userId, username, passwordHash });
      const sessionToken = generateSessionToken();
      const session = await createSession(sessionToken, userId);
      setSessionTokenCookie(event, sessionToken, session.expiresAt);
    } catch {
      return fail(500, { message: "An error has occurred" });
    }
    return redirect(302, "/demo/lucia");
  }
};
function generateUserId() {
  const bytes = crypto.getRandomValues(new Uint8Array(15));
  const id = encodeBase32LowerCase(bytes);
  return id;
}
function validateUsername(username) {
  return typeof username === "string" && username.length >= 3 && username.length <= 31 && /^[a-z0-9_-]+$/.test(username);
}
function validatePassword(password) {
  return typeof password === "string" && password.length >= 6 && password.length <= 255;
}

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B3MG7EW9.js')).default;
const server_id = "src/routes/demo/lucia/login/+page.server.ts";
const imports = ["_app/immutable/nodes/5.DzfuNT6b.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/U4uPd_bJ.js","_app/immutable/chunks/CSzMu1vm.js","_app/immutable/chunks/B_zd_zWB.js","_app/immutable/chunks/CshGISHq.js","_app/immutable/chunks/cASs5BBf.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-Dspd-8Co.js.map
