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

	protected function listKeysSignedParameters()
	{
		return [
			'IBLOCK_ID'
		];
	}

	public function __construct($component = null)
	{
		parent::__construct($component);

		try {
			\Bitrix\Main\Loader::includeModule('iblock');
		} catch (Exception $err) {
			return $err;
		}
	}

	public function onPrepareComponentParams($arParams)
	{
		return parent::onPrepareComponentParams($arParams);
	}

	public function executeComponent()
	{
		$this->includeComponentTemplate();
	}

	/**
	 * Получаем элемент информационного блока по его id
	 *
	 * @param int $id
	 * @return array
	 * @throws \Bitrix\Main\ArgumentException
	 * @throws \Bitrix\Main\ObjectPropertyException
	 * @throws \Bitrix\Main\SystemException
	 */
	public function getNewsByIDAction(int $id)
	{
		$detailEl = \Bitrix\Iblock\ElementTable::getById($id)->fetch();

		$detailEl['PREVIEW_PICTURE'] = CFile::GetFileArray($detailEl['PREVIEW_PICTURE']);

		return $detailEl;
	}

	public function getAllNewsAction()
	{
		return array_map(
			function ($news) {
				$news['PREVIEW_PICTURE'] = CFile::GetFileArray($news['PREVIEW_PICTURE']);
				return $news;
			},
			\Bitrix\Iblock\ElementTable::query()
				->setSelect(['*'])
				->where('IBLOCK_ID', $this->arParams['IBLOCK_ID'])
				->fetchAll()
		);
	}
}