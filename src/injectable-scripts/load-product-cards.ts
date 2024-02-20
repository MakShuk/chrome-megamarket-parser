export async function loadProductCards(
	storagePages: string,
	showMoreButton: string,
	loadingSpinner: string,
) {
	const showMoreBtn = document.querySelector(showMoreButton) as HTMLButtonElement;
	const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
	const convectToNumber = (str: string) => parseFloat(str.replace(/\D/g, ''));
	const pagesNumber = convectToNumber(storagePages);

	for (let i = 0; i < pagesNumber; i++) {
		const isFirsPage = i == 0;
		let isButtonLoading = showMoreBtn.querySelector(loadingSpinner);

		while (!isFirsPage && isButtonLoading) {
			await delay(1000);
			isButtonLoading = showMoreBtn.querySelector(loadingSpinner);
		}

		showMoreBtn.click();
		await delay(1000);
	}
}
