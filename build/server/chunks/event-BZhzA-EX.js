let request_event = null;
let als;
import('node:async_hooks').then((hooks) => als = new hooks.AsyncLocalStorage()).catch(() => {
});
function getRequestEvent() {
  const event = request_event ?? als?.getStore();
  if (!event) {
    let message = "Can only read the current request event inside functions invoked during `handle`, such as server `load` functions, actions, endpoints, and other server hooks.";
    if (!als) {
      message += " In environments without `AsyncLocalStorage`, the event must be read synchronously, not after an `await`.";
    }
    throw new Error(message);
  }
  return event;
}
function with_event(event, fn) {
  try {
    request_event = event;
    return als ? als.run(event, fn) : fn();
  } finally {
    request_event = null;
  }
}

export { getRequestEvent as g, with_event as w };
//# sourceMappingURL=event-BZhzA-EX.js.map
