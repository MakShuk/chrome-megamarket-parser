import { ExtensionSelector } from '@config/extension-selector.enum';
import { PageElementService } from '@services/page-element.service';
import { runBackgroundScript } from '@scripts/run-background-script';
import { isThisPage } from '@injectable-scripts/is-this-page';
import { initValueInStorage } from '@components/storage';

import './style.scss';
import { LocalStorageSetting } from '@config/local-storage-key.enum';
import { setEventToBonusButton, setEventToPagesButton } from '@components/button-events';

const MEGA_MARKET_URL = 'megamarket.ru';

async function init() {
	const startMessageArea = new PageElementService<HTMLDivElement>(
		ExtensionSelector.StartMessageArea,
	);
	const mainArea = new PageElementService<HTMLDivElement>(ExtensionSelector.MainArea);
	const { isThisPageResult, ...result } = await isMegaMarketPage();

	startMessageArea.hide(true);
	checkError(result);

	if (!isThisPageResult) {
		checkError({ errorStatus: true, content: 'Текущая страница не Мегамаркет' });
		return;
	}
	mainArea.hide(false);
	await initAllValueInStorage();

	setEventToBonusButton()
	setEventToPagesButton()
}

async function isMegaMarketPage() {
	const result = await runBackgroundScript<boolean>(isThisPage, [MEGA_MARKET_URL]);
	const isThisPageResult = !result.error && result.data;
	const errorStatus = result.error;
	const content = result.content;
	return { isThisPageResult, errorStatus, content };
}

function checkError({ errorStatus, content }: { errorStatus: boolean; content: string }) {
	const errorArea = new PageElementService<HTMLDivElement>(ExtensionSelector.ErrorMessageArea);
	if (errorStatus) {
		errorArea.setTextContent(content);
		errorArea.hide(false);
	}
}

async function initAllValueInStorage() {
	await initValueInStorage(LocalStorageSetting.Bonus, ExtensionSelector.BonusValue);
	await initValueInStorage(LocalStorageSetting.Pages, ExtensionSelector.PagesValue);
}

init();
