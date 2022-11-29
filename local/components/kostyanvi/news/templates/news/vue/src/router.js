import {VueRouter} from 'ui.vue';
import News from "./components/News.vue";
import NewsDetail from "./components/NewsDetail.vue";

const routes = [
	{
		path: '/',
		component: News
	},
	{
		path: '/:id',
		component: NewsDetail
	}
]

const router = VueRouter.create({
	mode: 'history',
	routes,
	base: '/news/'
});


export default router;