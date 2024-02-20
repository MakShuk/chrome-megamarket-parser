import { ExtensionSelector } from '@config/extension-selector.enum';
import { PageElementService } from '@services/page-element.service';
import { runBackgroundScript } from '@scripts/run-background-script';
import { isCurrentPage } from '@injectable-scripts/is-this-page';
import { initValueInStorage } from '@components/storage';

import './style.scss';
import { LocalStorageSetting } from '@config/local-storage-key.enum';
import { addMainButtonEvents } from '@components/main-button-events';
import { displayError } from '@scripts/check-error';
import { addSetValueButtonEvents } from '@components/button-events';

const MEGA_MARKET_URL = 'megamarket.ru';

async function init() {
	const startMessageArea = new PageElementService<HTMLDivElement>(
		ExtensionSelector.StartMessageArea,
	);
	const mainArea = new PageElementService<HTMLDivElement>(ExtensionSelector.MainArea);
	const { isThisPageResult, ...result } = await isMegaMarketPage();

	startMessageArea.hide(true);
	displayError(result);

	if (!isThisPageResult) {
		displayError({ error: true, content: 'Текущая страница не Мегамаркет' });
		return;
	}
	await initAllValueInStorage();

	addSetValueButtonEvents();
	addMainButtonEvents();
	mainArea.hide(false);
}

async function isMegaMarketPage() {
	const result = await runBackgroundScript<boolean>(isCurrentPage, [MEGA_MARKET_URL]);
	const isThisPageResult = !result.error && result.data;
	const error = result.error;
	const content = result.content;
	return { isThisPageResult, error, content };
}

async function initAllValueInStorage() {
	await initValueInStorage(LocalStorageSetting.Bonus, ExtensionSelector.BonusValue);
	await initValueInStorage(LocalStorageSetting.Pages, ExtensionSelector.PagesValue);
}

init();
