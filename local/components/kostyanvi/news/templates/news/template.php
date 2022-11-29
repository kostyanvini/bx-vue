<? if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
	die();
}
const VUEJS_DEBUG = true;

$this->setFrameMode(false);
?>

<div id="news"></div>

<script>
	BX.ready(function () {
		BX.NewsManager.init('#news');
	});
</script>

