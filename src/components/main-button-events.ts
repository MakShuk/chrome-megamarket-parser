import { ExtensionSelector } from '@config/extension-selector.enum';
import { LocalStorageSetting } from '@config/local-storage-key.enum';
import { MegaMarketSelector } from '@config/mega-market-selector';
import { hideNonMatchingElements } from '@injectable-scripts/hide-non-matching-elements';
import { loadProductCards } from '@injectable-scripts/load-product-cards';
import { checkError } from '@scripts/check-error';
import { runBackgroundScript } from '@scripts/run-background-script';
import { PageElementService } from '@services/page-element.service';
import { LocalStorage } from 'storage-manager-js';

export function addMainButtonEvents() {
	const btnElement = new PageElementService<HTMLButtonElement>(ExtensionSelector.ParseButton);
	const mainArea = new PageElementService<HTMLDivElement>(ExtensionSelector.MainArea);
	const seinerLoading = new PageElementService<HTMLDivElement>(ExtensionSelector.LoadingSpinner);

	if (btnElement.node.error) return;

	btnElement.addEvent(async () => {
		mainArea.hide(true);
		seinerLoading.hide(false);
		const result = await hideFailElements();
		console.log(result);
		seinerLoading.hide(true);
		if(result.error) {
			checkError(result)
			return
		}
		mainArea.hide(false);
	});
}

async function hideFailElements() {
	const storageBonus = LocalStorage.get<string>(LocalStorageSetting.Bonus) || '20';
	const storagePages = LocalStorage.get<string>(LocalStorageSetting.Pages) || '3';
	const resultFitter = await runBackgroundScript<string>(hideNonMatchingElements, [
		MegaMarketSelector.Bonus,
		MegaMarketSelector.Card,
		MegaMarketSelector.Price,
		MegaMarketSelector.ShowMoreButton,
		storageBonus,
	]);

	const resultPage = await runBackgroundScript<string>(loadProductCards, [
		storagePages,
		MegaMarketSelector.ShowMoreButton,
		MegaMarketSelector.LoadingSpinner,
	]);

	return {
		error:  (resultFitter.error || resultPage.error) ? true : false,
		content: `loadProductCards content: ${resultPage.content},hideNonMatchingElements content: ${resultFitter.content}`,
	};
}
