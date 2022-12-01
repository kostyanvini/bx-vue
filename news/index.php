<?
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("Новости");
?><?$APPLICATION->IncludeComponent(
	"kostyanvi:news", 
	"news", 
	array(
		"COMPONENT_TEMPLATE" => "news",
		"IBLOCK_ID" => "1",
		"SEF_MODE" => "Y",
		"SEF_FOLDER" => "/news/"
	),
	false
);?>

<? require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>