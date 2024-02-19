import { PageElementService } from '@services/page-element.service';
import { LocalStorage } from 'storage-manager-js';

export async function initValueInStorage(token: string, elementId: string) {
	if (!LocalStorage.has(token)) return;

	const value = LocalStorage.get<string>(token);
	const elStatus = new PageElementService<HTMLDivElement>(elementId);

	value && elStatus.setTextContent(value);
}
