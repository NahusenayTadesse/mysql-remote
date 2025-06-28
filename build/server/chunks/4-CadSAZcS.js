import { i as invalidateSession, d as deleteSessionTokenCookie } from './auth-CazrXHF0.js';
import { f as fail, r as redirect } from './index-CCyR2w2-.js';
import { g as getRequestEvent } from './event-BZhzA-EX.js';
import 'drizzle-orm';
import '@oslojs/crypto/sha2';
import '@oslojs/encoding';
import 'drizzle-orm/mysql2';
import 'mysql2/promise';
import 'drizzle-orm/mysql-core';

const load = async () => {
  const user = requireLogin();
  return { user };
};
const actions = {
  logout: async (event) => {
    if (!event.locals.session) {
      return fail(401);
    }
    await invalidateSession(event.locals.session.id);
    deleteSessionTokenCookie(event);
    return redirect(302, "/demo/lucia/login");
  }
};
function requireLogin() {
  const { locals } = getRequestEvent();
  if (!locals.user) {
    return redirect(302, "/demo/lucia/login");
  }
  return locals.user;
}

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 4;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CGB5U0se.js')).default;
const server_id = "src/routes/demo/lucia/+page.server.ts";
const imports = ["_app/immutable/nodes/4.DNyOsd_8.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/U4uPd_bJ.js","_app/immutable/chunks/CSzMu1vm.js","_app/immutable/chunks/B_zd_zWB.js","_app/immutable/chunks/CshGISHq.js","_app/immutable/chunks/cASs5BBf.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-CadSAZcS.js.map
