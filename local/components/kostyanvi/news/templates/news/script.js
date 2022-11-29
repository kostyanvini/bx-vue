this.BX = this.BX || {};
(function (exports,ui_vue,ui_vue_vuex) {
    'use strict';

    var News = {
    render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"news"},_vm._l((_vm.news),function(el){return _c('div',{key:el.ID,staticClass:"news__item"},[_c('div',{staticClass:"news__item-image"},[_c('img',{attrs:{"src":el.PREVIEW_PICTURE.SRC,"alt":el.PREVIEW_PICTURE.ALT}})]),_vm._v(" "),_c('div',{staticClass:"news__item-info"},[_c('a',{staticClass:"news__item-title",attrs:{"href":"javascript:void(0)"},on:{"click":function($event){return _vm.$router.push(el.ID)}}},[_vm._v("\n                "+_vm._s(el.NAME)+"\n            ")]),_vm._v(" "),_c('div',{staticClass:"news__item-text",domProps:{"innerHTML":_vm._s(el.PREVIEW_TEXT)}})])])}),0)},
    staticRenderFns: [],
        name: 'News',
        data() {
            return {
                news: []
            }
        },
        created() {
            if (this.$store.state.news.length) {
                this.news = this.$store.state.news;
            } else {
                BX.ajax.runComponentAction('kostyanvi:news', 'getAllNews', {
                        mode: 'class',
                        data: {},
                    }
                ).then((responce => {
                    try {
                        const news  = JSON.parse(responce.data);
                        this.news = news;
                        this.$store.commit('setAllNews', news);
                    } catch (e) {
                        console.warn('Не удалось получить данные');
                        this.news = [];
                    }
                }));
            }
        },
        mounted() {

        }
    };

    var NewsDetail = {
    render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"detail-news"},[(_vm.isLoaded)?_c('div',{staticClass:"loader"},[_vm._v("Loading...")]):_c('div',[_c('router-link',{staticClass:"rollback",attrs:{"to":"/"}},[_vm._v("Go back")]),_vm._v(" "),_c('div',{staticClass:"detail-news__info"},[_c('div',{staticClass:"detail-news__info-name"},[_vm._v("\n                "+_vm._s(_vm.newsDetailInfo.NAME)+"\n            ")]),_vm._v(" "),_c('div',{staticClass:"detail-news__info-text",domProps:{"innerHTML":_vm._s(_vm.newsDetailInfo.DETAIL_TEXT)}})])],1)])},
    staticRenderFns: [],
        data() {
            return {
                isLoaded: true,
                newsDetailInfo: {}
            }
        },
        created() {
            if (this.$store.state.newsCache[+this.$route.params.id]) {
                this.newsDetailInfo = this.$store.state.newsCache[+this.$route.params.id];
            } else {
                BX.ajax.runComponentAction('kostyanvi:news', 'getNewsByID', {
                        mode: 'class',
                        data: {
                            id: +this.$route.params.id
                        },
                    }
                ).then((responce => {
                    try {
                        const result = JSON.parse(responce.data);
                        this.newsDetailInfo = result;
                        this.$store.commit('registerNewNewsCache', result);
                    } catch (e) {
                        console.warn('Не удалось получить данные');
                        this.newsDetailInfo = {};
                    }
                }));
            }
            // Имитация загрузки
            setTimeout(() => this.isLoaded = 0, 500);
        }
    };

    const routes = [
    	{
    		path: '/',
    		component: News
    	},
    	{
    		path: '/:id',
    		component: NewsDetail
    	}
    ];

    const router = ui_vue.VueRouter.create({
    	mode: 'history',
    	routes,
    	base: '/news/'
    });

    const store = ui_vue_vuex.Vuex.createStore({
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

    var App = {
    render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('router-view')},
    staticRenderFns: [],
        name: 'App'
    };

    function init(node) {
    	return ui_vue.BitrixVue.createApp({
    		router,
    		store,
    		render: h => h(App)
    	})
    		.mount(node);
    }

    exports.init = init;

}((this.BX.NewsManager = this.BX.NewsManager || {}),BX,BX));
//# sourceMappingURL=script.js.map
