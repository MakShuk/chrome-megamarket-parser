import { ExtensionSelector } from '@config/extension-selector.enum';
import { LocalStorageSetting } from '@config/local-storage-key.enum';
import { PageElementService } from '@services/page-element.service';
import { LocalStorage } from 'storage-manager-js';

export function setEventToBonusButton() {
	const btnElement = new PageElementService<HTMLButtonElement>(ExtensionSelector.SetBonusButton);
	const inputElement = new PageElementService<HTMLInputElement>(ExtensionSelector.BonusInput);
	const valueElement = new PageElementService<HTMLInputElement>(ExtensionSelector.BonusValue);

	btnElement.addEvent(() => {
		const valueStatus = inputElement.getValue<string>();

		if (valueStatus.error) return;
		const value = `${valueStatus.content} %`;

		LocalStorage.set(LocalStorageSetting.Bonus, value);
		valueElement.setTextContent(value);
	});
}

export function setEventToPagesButton() {
	const btnElement = new PageElementService<HTMLButtonElement>(ExtensionSelector.SetPagesButton);
	const inputElement = new PageElementService<HTMLInputElement>(ExtensionSelector.PagesInput);
	const valueElement = new PageElementService<HTMLInputElement>(ExtensionSelector.PagesValue);

	btnElement.addEvent(() => {
		const valueStatus = inputElement.getValue<string>();

		if (valueStatus.error) return;
		const value = `${valueStatus.content} стр.`;

		LocalStorage.set(LocalStorageSetting.Pages, value);
		valueElement.setTextContent(value);
	});

}
