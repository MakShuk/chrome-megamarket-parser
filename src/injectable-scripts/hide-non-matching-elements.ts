export function hideNonMatchingElements(
	bonus: string,
	card: string,
	price: string,
	storagePages: string,
	storageBonus: string,
) {
	function hideElements() {
		const convectToNumber = (str: string) => parseFloat(str.replace(/\D/g, ''));
		const elementsWithDataId = document.querySelectorAll(card) as NodeListOf<HTMLDivElement>;
		console.clear();

		for (const element of elementsWithDataId) {
			const bonusEl = element.querySelector(bonus);
			const priceEl = element.querySelector(price);
			const bonusValue = bonusEl && bonusEl.textContent?.trim();
			const priceValue = priceEl && priceEl.textContent?.trim();

			if (!(bonusValue && priceValue)) continue;

			const percent = Math.round((convectToNumber(bonusValue) / convectToNumber(priceValue)) * 100);

			if (percent < convectToNumber(storageBonus)) {
				element.style.opacity = '0.2';
				element.style.position = 'absolute';
				element.style.left = '-9999px';
			}
		}
	}

	const target = document.querySelector(storagePages);

	if (target !== null) {
		const observer = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				if (mutation.target instanceof Element && mutation.target.matches(storagePages)) {
					hideElements();
				}
			});
		});

		observer.observe(target, {
			childList: true,
			subtree: true,
			attributes: true,
			characterData: true,
		});
	}

	hideElements();
}
