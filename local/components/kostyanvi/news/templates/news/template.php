<? if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
	die();
}
$this->setFrameMode(false);

$vueParams = \Bitrix\Main\Web\Json::encode([
	'componentName' => $this->getComponent()->getName(),
	'signedParameters' => $this->getComponent()->getSignedParameters(),
	'getAllNews' => 'getAllNews',
	'getNewsByID' => 'getNewsByID'
], JSON_UNESCAPED_UNICODE);
?>

<div id="news"></div>

<script>
	BX.ready(function () {
		BX.NewsManager.init('#news', <?= $vueParams ?>);
	});
</script>

