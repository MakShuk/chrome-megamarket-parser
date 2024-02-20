import { ExtensionSelector } from '@config/extension-selector.enum';
import { PageElementService } from '@services/page-element.service';

export function checkError({ error, content }: { error: boolean; content: string }) {
	const errorArea = new PageElementService<HTMLDivElement>(ExtensionSelector.ErrorMessageArea);
	if (error) {
		errorArea.setTextContent(content);
		errorArea.hide(false);
	}
}
