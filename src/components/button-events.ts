import { ExtensionSelector } from '@config/extension-selector.enum';
import { LocalStorageSetting } from '@config/local-storage-key.enum';
import { PageElementService } from '@services/page-element.service';
import { LocalStorage } from 'storage-manager-js';

function addInputValueChangeHandler(
  buttonSelector: string,
  inputSelector: string,
  valueSelector: string,
  storageKey: LocalStorageSetting
) {
  const button = new PageElementService<HTMLButtonElement>(buttonSelector);
  const input = new PageElementService<HTMLInputElement>(inputSelector);
  const value = new PageElementService<HTMLDivElement>(valueSelector);

  if (button.node.error || input.node.error || value.node.error) {
    return;
  }

  button.addEvent(() => {
    const { error, content } = input.getValue<string>();

    if (error) {
      return;
    }

    const formattedValue = `${content} ${storageKey === LocalStorageSetting.Bonus ? '%' : 'стр.'}`;
    LocalStorage.set(storageKey, formattedValue);
    input.setValue('');
    value.setTextContent(formattedValue);
  });
}

export function addSetValueButtonEvents() {
  addInputValueChangeHandler(
    ExtensionSelector.SetBonusButton,
    ExtensionSelector.BonusInput,
    ExtensionSelector.BonusValue,
    LocalStorageSetting.Bonus
  );

  addInputValueChangeHandler(
    ExtensionSelector.SetPagesButton,
    ExtensionSelector.PagesInput,
    ExtensionSelector.PagesValue,
    LocalStorageSetting.Pages
  );
}