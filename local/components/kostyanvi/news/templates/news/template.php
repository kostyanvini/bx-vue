<? if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
	die();
}
$this->setFrameMode(false);

$vueParams = \Bitrix\Main\Web\Json::encode([
	'componentName' => $this->getComponent()->getName(),
	'signedParameters' => $this->getComponent()->getSignedParameters(),
	'paginationParams' => $arResult['PAGINATION'],
	'getAllNews' => 'getAllNews',
	'getNewsByID' => 'getNewsByID',
	'getPageNews' => 'getPageNews'
], JSON_UNESCAPED_UNICODE);
?>

<div id="news"></div>

<script>
	BX.ready(function () {
		BX.NewsManager.init('#news', <?= $vueParams ?>);
	});
</script>

