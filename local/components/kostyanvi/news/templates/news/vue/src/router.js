import {VueRouter} from 'ui.vue';
import News from "./components/News.vue";
import NewsDetail from "./components/NewsDetail.vue";
import AllNews from "./components/AllNews.vue";
import ErrorPage from "./components/ErrorPage.vue";

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
]

const router = VueRouter.create({
	mode: 'history',
	routes,
	base: '/news/'
});


export default router;