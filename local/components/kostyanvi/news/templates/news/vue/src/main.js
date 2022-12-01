import {BitrixVue} from 'ui.vue';
import router from "./router.js";
import store from "./store";

import App from "./components/App.vue";

export function init(node, componentProps) {
	BitrixVue.createApp({
		data() {
			return {
				...componentProps
			}
		},
		router,
		store,
		render: h => h(App)
	}).mount(node);
}