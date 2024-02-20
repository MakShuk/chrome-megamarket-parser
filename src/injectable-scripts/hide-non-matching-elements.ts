export function hideNonMatchingElements(
	bonusSelector: string,
	cardSelector: string,
	priceSelector: string,
	showMoreButtonSelector: string,
	targetBonus: string
  ) {
	const extractNumber = (str: string) => parseFloat(str.replace(/\D/g, ''));
  
	function hideElementsWithLowBonus() {
	  const cardElements = document.querySelectorAll(cardSelector) as NodeListOf<HTMLDivElement>;
  
	  cardElements.forEach((cardElement) => {
		const bonusElement = cardElement.querySelector(bonusSelector);
		const priceElement = cardElement.querySelector(priceSelector);
  
		const bonusValue = bonusElement && bonusElement.textContent?.trim();
		const priceValue = priceElement && priceElement.textContent?.trim();
  
		if (!(bonusValue && priceValue)) return;
  
		const bonus = extractNumber(bonusValue);
		const price = extractNumber(priceValue);
		const percent = Math.round((bonus / price) * 100);
  
		if (percent < extractNumber(targetBonus)) {
		  hideElement(cardElement);
		}
	  });
	}
  
	function hideElement(element: HTMLElement) {
	  element.style.opacity = '0.2';
	  element.style.position = 'absolute';
	  element.style.left = '-9999px';
	}
  
	function initMutationObserver() {
	  const target = document.querySelector(showMoreButtonSelector);
	  if (target !== null) {
		const observer = new MutationObserver((mutations) => {
		  mutations.forEach((mutation) => {
			if (mutation.target instanceof Element && mutation.target.matches(showMoreButtonSelector)) {
			  hideElementsWithLowBonus();
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
	}
  
	hideElementsWithLowBonus();
	initMutationObserver();
  }