<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
	die();
}

$arComponentDescription = array(
	"NAME" => GetMessage('COMPONENT_DESCRIPTION_NEWS_NAME'),
	"DESCRIPTION" => GetMessage('COMPONENT_DESCRIPTION_NEWS_DESCRIPTION'),
	"SORT" => 10,
	"CACHE_PATH" => "Y",
	"PATH" => array(
		"ID" => "component",
		"NAME" => GetMessage("COMPONENT_DESCRIPTION_NEWS_NAMESPACE"),
	),
);

?>