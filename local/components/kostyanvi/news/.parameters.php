<? if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

if (!CModule::IncludeModule("iblock")) {
	return;
}

use Bitrix\Iblock\IblockTable;
use Bitrix\Main\Localization\Loc;

Loc::loadMessages(__DIR__);

$rsIBlocks = IblockTable::query()->setSelect(['ID', 'NAME', 'CODE'])->fetchAll();
$arIBlocks = [];

foreach ($rsIBlocks as $arIBlock) {
	$arIBlocks[$arIBlock['ID']] = $arIBlock['CODE'] . ' - ' . $arIBlock['NAME'];
}

$arComponentParameters = [
	"GROUPS" => [
		'BASE_SETTINGS' => [
			'NAME' => Loc::getMessage('PARAMETERS_GROUPS_BASE_NAME')
		],
		'NAVIGATION_SETTINGS' => [
			'NAME' => Loc::getMessage('PARAMETERS_GROUPS_NAVIGATION_NAME')
		],

	],
	'PARAMETERS' => [
		'IBLOCK_ID' => [
			"PARENT" => "BASE_SETTINGS",
			"NAME" => Loc::getMessage('PARAMETERS_PARAM_IBLOCK_ID_NAME'),
			"TYPE" => "LIST",
			"VALUES" => $arIBlocks,
			"DEFAULT" => '',
			"ADDITIONAL_VALUES" => "Y",
			"REFRESH" => "N",
		],
		'ELEMENT_COUNT' => [
			"PARENT" => "NAVIGATION_SETTINGS",
			"NAME" => Loc::getMessage('PARAMETERS_NAVIGATION_COUNT_NAME'),
			"TYPE" => "STRING",
			"DEFAULT" => '20',
			"REFRESH" => "N",
		],
	]
];