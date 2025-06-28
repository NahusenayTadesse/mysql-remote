const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.XWXxwDRJ.js",app:"_app/immutable/entry/app.DPXwvUz4.js",imports:["_app/immutable/entry/start.XWXxwDRJ.js","_app/immutable/chunks/cASs5BBf.js","_app/immutable/chunks/CSzMu1vm.js","_app/immutable/chunks/U4uPd_bJ.js","_app/immutable/chunks/B_zd_zWB.js","_app/immutable/entry/app.DPXwvUz4.js","_app/immutable/chunks/U4uPd_bJ.js","_app/immutable/chunks/CSzMu1vm.js","_app/immutable/chunks/B_zd_zWB.js","_app/immutable/chunks/CWj6FrbW.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-Da8LRAB4.js')),
			__memo(() => import('./chunks/1-DARMQcJ1.js')),
			__memo(() => import('./chunks/2-CiSn6ISX.js')),
			__memo(() => import('./chunks/3-Bg36Hvow.js')),
			__memo(() => import('./chunks/4-CadSAZcS.js')),
			__memo(() => import('./chunks/5-Dspd-8Co.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/demo",
				pattern: /^\/demo\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/demo/lucia",
				pattern: /^\/demo\/lucia\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/demo/lucia/login",
				pattern: /^\/demo\/lucia\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
