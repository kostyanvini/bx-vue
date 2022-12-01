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
		'CUSTOM_SETTINGS' => [
			'NAME' => Loc::getMessage('PARAMETERS_GROUPS_CUSTOM_NAME')
		]
	],
	'PARAMETERS' => [
		'IBLOCK_ID' => [
			"PARENT" => "CUSTOM_SETTINGS",
			"NAME" => Loc::getMessage('PARAMETERS_PARAM_IBLOCK_ID_NAME'),
			"TYPE" => "LIST",
			"VALUES" => $arIBlocks,
			"DEFAULT" => '',
			"ADDITIONAL_VALUES" => "Y",
			"REFRESH" => "N",
		]
	]
];