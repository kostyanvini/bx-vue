<? if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

\Bitrix\Main\UI\Extension::load([
	'ui.vue',
	'ui.vue.router',
	'ui.vue.vuex'
]);
