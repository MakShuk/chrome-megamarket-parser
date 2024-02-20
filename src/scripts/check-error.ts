import { ExtensionSelector } from '@config/extension-selector.enum';
import { PageElementService } from '@services/page-element.service';

export function displayError(errorDetails: { error: boolean; content: string }) {
	const errorArea = new PageElementService<HTMLDivElement>(ExtensionSelector.ErrorMessageArea);

	if (errorArea.node.error) {
		console.warn('Элемент ErrorMessageArea не найден на странице');
		return;
	}

	if (errorDetails.error) {
		errorArea.setTextContent(errorDetails.content);
		errorArea.hide(false);
	}
}
