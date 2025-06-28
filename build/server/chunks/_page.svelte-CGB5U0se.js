import { e as escape_html } from './client-CflGaa2e.js';
import { p as push, n as pop } from './exports-8jCcAqxF.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  $$payload.out += `<h1>Hi, ${escape_html(data.user.username)}!</h1> <p>Your user ID is ${escape_html(data.user.id)}.</p> <form method="post" action="?/logout"><button>Sign out</button></form>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CGB5U0se.js.map
