import {Vuex} from 'ui.vue.vuex';

const store = Vuex.createStore({
	state: {
		newsCache: {},
		news: []
	},
	mutations: {
		registerNewNewsCache(store, newValue) {
			store.newsCache[newValue.ID] = newValue;
		},
		setAllNews(store, news) {
			store.news = news;
		}
	}
});

export default store;