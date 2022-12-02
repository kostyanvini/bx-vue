this.BX = this.BX || {};
(function (exports,ui_vue,ui_vue_vuex) {
    'use strict';

    var Loader = {
    render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)},
    staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"news-loader"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"yellow"}),_vm._v(" "),_c('div',{staticClass:"red"}),_vm._v(" "),_c('div',{staticClass:"blue"}),_vm._v(" "),_c('div',{staticClass:"violet"})])])}],
        name: 'Loader'
    };

    var News = {
    render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"news"},[(_vm.isLoaded)?_c('Loader'):_vm._l((_vm.news),function(el){return _c('div',{key:el.ID,staticClass:"news__item"},[_c('div',{staticClass:"news__item-image"},[_c('img',{attrs:{"src":el.PREVIEW_PICTURE.SRC,"alt":el.PREVIEW_PICTURE.ALT}})]),_vm._v(" "),_c('div',{staticClass:"news__item-info"},[_c('a',{staticClass:"news__item-title",attrs:{"href":"javascript:void(0)"},on:{"click":function($event){return _vm.$router.push(el.ID)}}},[_vm._v("\n                "+_vm._s(el.NAME)+"\n            ")]),_vm._v(" "),_c('div',{staticClass:"news__item-text",domProps:{"innerHTML":_vm._s(el.PREVIEW_TEXT)}})])])})],2)},
    staticRenderFns: [],
        name: 'News',
        components: {
            Loader
        },
        props: {
            componentParams: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                news: [],
                isLoaded: true,
            }
        },
        created() {
            if (this.$store.state.news.length) {
                this.news = this.$store.state.news;
                this.isLoaded = false;
            } else {
                BX.ajax.runComponentAction(this.componentParams.componentName, this.componentParams.getAllNews, {
                        mode: 'class',
                        signedParameters: this.componentParams.signedParameters,
                        data: {},
                    }
                ).then((responce => {
                        const news = responce.data;
                        this.news = news;
                        this.$store.commit('setAllNews', news);
                        this.isLoaded = false;
                    })
                ).catch(err => warn(err));
            }
        },
    };

    var NewsDetail = {
    render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"detail-news"},[(_vm.isLoaded)?_c('Loader'):_c('div',[_c('router-link',{staticClass:"rollback",attrs:{"to":"/"}},[_vm._v("Go back")]),_vm._v(" "),_c('div',{staticClass:"detail-news__info"},[_c('div',{staticClass:"detail-news__info-name"},[_vm._v("\n                "+_vm._s(_vm.newsDetailInfo.NAME)+"\n            ")]),_vm._v(" "),_c('div',{staticClass:"detail-news__info-text",domProps:{"innerHTML":_vm._s(_vm.newsDetailInfo.DETAIL_TEXT)}})])],1)],1)},
    staticRenderFns: [],
        name: 'DetailNews',
        components: {Loader},
        props: {
            componentParams: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                isLoaded: true,
                newsDetailInfo: {}
            }
        },
        created() {
            if (this.$store.state.newsCache[+this.$route.params.id]) {
                this.newsDetailInfo = this.$store.state.newsCache[+this.$route.params.id];
                this.isLoaded = 0;
            } else {
                BX.ajax.runComponentAction(this.componentParams.componentName, this.componentParams.getNewsByID, {
                        mode: 'class',
                        signedParameters: this.componentParams.signedParameters,
                        data: {
                            id: +this.$route.params.id
                        },
                    }
                ).then((responce => {
                        const result = responce.data;
                        this.newsDetailInfo = result;
                        this.$store.commit('registerNewNewsCache', result);
                        this.isLoaded = false;
                    })
                ).catch(e => console.warn(e));
            }
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
    render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('router-view',{attrs:{"componentParams":_vm.componentParams}})},
    staticRenderFns: [],
        name: 'App',
        props: {
            componentParams: {
                type: Object,
                required: true
            }
        }
    };

    function init(node, bxProps) {
    	ui_vue.BitrixVue.createApp({
    		router,
    		store,
    		render: h => h(App, {
    			props: {
    				componentParams: bxProps
    			}
    		})
    	}).mount(node);
    }

    exports.init = init;

}((this.BX.NewsManager = this.BX.NewsManager || {}),BX,BX));
//# sourceMappingURL=script.js.map
