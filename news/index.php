<?
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("Новости");
?>

<? $APPLICATION->IncludeComponent(
	"kostyanvi:news",
	"news", 
	array(
		"COMPONENT_TEMPLATE" => "news",
		"IBLOCK_ID" => "1"
	),
	false
);?>

<? require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>