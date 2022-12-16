this.BX = this.BX || {};
(function (exports,ui_vue,ui_vue_vuex) {
    'use strict';

    var Loader = {
    render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)},
    staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"news-loader"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"yellow"}),_vm._v(" "),_c('div',{staticClass:"red"}),_vm._v(" "),_c('div',{staticClass:"blue"}),_vm._v(" "),_c('div',{staticClass:"violet"})])])}],
        name: 'Loader'
    };

    var Pagination = {
    render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"pagination"},_vm._l((_vm.paginationParams.ALL_PAGES),function(page){return _c('a',{key:page,staticClass:"pagination__item",class:{'_active': +_vm.$route.params.pageId === page},attrs:{"href":"javascript:void(0)"},on:{"click":function($event){return _vm.changePage(page)}}},[_vm._v("\n        "+_vm._s(page)+"\n    ")])}),0)},
    staticRenderFns: [],
        name: 'Pagination',
        props: ['paginationParams'],
        methods: {
            changePage(page) {
                this.$router.push(`/page/${page}`);
                this.$emit('pageChanged', page);
            }
        }
    };

    var News = {
    render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"news"},[(_vm.isLoaded)?_c('Loader'):_vm._l((_vm.news),function(el){return _c('div',{key:el.ID,staticClass:"news__item"},[_c('div',{staticClass:"news__item-image"},[_c('img',{attrs:{"src":el.PREVIEW_PICTURE.SRC,"alt":el.PREVIEW_PICTURE.ALT}})]),_vm._v(" "),_c('div',{staticClass:"news__item-info"},[_c('a',{staticClass:"news__item-title",attrs:{"href":"javascript:void(0)"},on:{"click":function($event){return _vm.moveToDetail(el.ID)}}},[_vm._v("\n                "+_vm._s(el.NAME)+"\n            ")]),_vm._v(" "),_c('div',{staticClass:"news__item-text",domProps:{"innerHTML":_vm._s(el.PREVIEW_TEXT)}})])])}),_vm._v(" "),_c('Pagination',{attrs:{"paginationParams":_vm.componentParams.paginationParams},on:{"pageChanged":_vm.changePage}})],2)},
    staticRenderFns: [],
        name: 'News',
        components: {
            Pagination,
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
                currentPage: 1
            }
        },
        created() {
            if (this.$store.state.news.length) {
                this.news = this.$store.state.news;
                this.isLoaded = false;
            } else {
                this.currentPage = this.$route.params.pageId || 1;

                BX.ajax.runComponentAction(this.componentParams.componentName, this.componentParams.getPageNews, {
                        mode: 'class',
                        signedParameters: this.componentParams.signedParameters,
                        data: {
                            page: this.currentPage
                        },
                    }
                ).then((responce => {
                        const news = responce.data;
                        this.news = news;
                        this.$store.commit('setAllNews', news);
                        this.isLoaded = false;
                    })
                ).catch(err => {
                    console.warn(err);
                    this.news = [];
                    this.isLoaded = false;
                });
            }
        },
        methods: {
            changePage(page) {
                this.isLoaded = true;
                BX.ajax.runComponentAction(this.componentParams.componentName, this.componentParams.getPageNews, {
                        mode: 'class',
                        signedParameters: this.componentParams.signedParameters,
                        data: {
                            page
                        },
                    }
                ).then((responce => {
                        this.news = responce.data;
                        this.isLoaded = false;
                        this.currentPage = page;
                    })
                ).catch(err => {
                    console.warn(err);
                    this.news = [];
                    this.isLoaded = false;
                });
            },
            moveToDetail(id) {
                this.$router.push({
                    name: 'detail',
                    params: {
                        id,
                        fromPage: this.currentPage
                    }
                });
            }
        }
    };

    var NewsDetail = {
    render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"detail-news"},[(_vm.isLoaded)?_c('Loader'):_c('div',[_c('a',{staticClass:"rollback",attrs:{"href":"javascript:void(0)"},on:{"click":_vm.goBack}},[_vm._v("Go back")]),_vm._v(" "),_c('div',{staticClass:"detail-news__info"},[_c('div',{staticClass:"detail-news__info-name"},[_vm._v("\n                "+_vm._s(_vm.newsDetailInfo.NAME)+"\n            ")]),_vm._v(" "),_c('div',{staticClass:"detail-news__info-text",domProps:{"innerHTML":_vm._s(_vm.newsDetailInfo.DETAIL_TEXT)}})])])],1)},
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
                ).catch(e => {
                    console.warn(err);
                    this.isLoaded = false;
                });
            }
        },
        methods: {
            goBack() {
                if(this.$route.params.fromPage) {
                    this.$router.push('/page/' + this.$route.params.fromPage);
                }
                else {
                    this.$router.push('/');
                }
            }
        }
    };

    var AllNews = {
    render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"news"},[(_vm.isLoaded)?_c('Loader'):_vm._l((_vm.news),function(el){return _c('div',{key:el.ID,staticClass:"news__item"},[_c('div',{staticClass:"news__item-image"},[_c('img',{attrs:{"src":el.PREVIEW_PICTURE.SRC,"alt":el.PREVIEW_PICTURE.ALT}})]),_vm._v(" "),_c('div',{staticClass:"news__item-info"},[_c('a',{staticClass:"news__item-title",attrs:{"href":"javascript:void(0)"},on:{"click":function($event){return _vm.$router.push('/detail/' + el.ID)}}},[_vm._v("\n                "+_vm._s(el.NAME)+"\n            ")]),_vm._v(" "),_c('div',{staticClass:"news__item-text",domProps:{"innerHTML":_vm._s(el.PREVIEW_TEXT)}})])])})],2)},
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
            ).catch(err => {
                console.warn(err);
                this.news = [];
                this.isLoaded = false;
            });
        },
    };

    var ErrorPage = {
    render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"error-page"},[_vm._v("\n    404\n")])},
    staticRenderFns: [],

    };

    const routes = [
    	{
    		path: '/',
    		component: News,
    		name: 'index'
    	},
    	{
    		path: '/all',
    		component: AllNews,
    		name: 'all'
    	},
    	{
    		path: '/detail/:id',
    		component: NewsDetail,
    		name: 'detail'
    	},
    	{
    		path: '/page/:pageId',
    		component: News,
    		name: 'page'
    	},
    	{
    		path: '/*',
    		component: ErrorPage,
    		name: 'page404'
    	},
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
