<? if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
	die();
}

use Bitrix\Main\Engine\Contract\Controllerable;
use Bitrix\Main\Web\Json;

class CNewsComponent extends CBitrixComponent implements Controllerable
{
	public function configureActions()
	{
		return [];
	}

	public function executeComponent()
	{
		$this->includeComponentTemplate();
	}

	public function getNewsByIDAction()
	{
		if (\Bitrix\Main\Loader::includeModule('iblock')) {
			$newsDetailInfo = [];
			$request = \Bitrix\Main\Context::getCurrent()->getRequest();

			$detailEl = \Bitrix\Iblock\ElementTable::getById($request->get('id'));

			$newsDetailInfo = $detailEl->fetch();

			$newsDetailInfo['PREVIEW_PICTURE'] = CFile::GetFileArray($newsDetailInfo['PREVIEW_PICTURE']);

			return Json::encode($newsDetailInfo);
		} else {
			return Json::encode([]);
		}
	}

	public function getAllNewsAction()
	{
		if (\Bitrix\Main\Loader::includeModule('iblock')) {
			$newsList = [];
			$dbNewsResult = \Bitrix\Iblock\ElementTable::getList([
				'select' => ['*'],
				'filter' => [
					'IBLOCK_ID' => 1
				]
			]);

			while ($news = $dbNewsResult->fetch()) {
				if (!is_array($news['PREVIEW_PICTURE'])) {
					$news['PREVIEW_PICTURE'] = CFile::GetFileArray($news['PREVIEW_PICTURE']);
				}

				$newsList[] = $news;
			}

			if (!empty($newsList)) {
				return Json::encode($newsList);
			} else {
				return Json::encode([]);
			}
		} else {
			return Json::encode([]);
		}
	}
}