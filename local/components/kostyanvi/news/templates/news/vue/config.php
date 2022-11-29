<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

return [
	'js' => '../script.js',
	'css' => '../style.css',
	'rel' => [
		'main.polyfill.core',
		'ui.vue',
		'ui.vue.vuex',
	],
	'skip_core' => true,
];