export async function loadProductCards(
	storagePages: string,
	showMoreButton: string,
	loadingSpinner: string,
) {
	const showMoreBtn = document.querySelector(showMoreButton) as HTMLButtonElement;
	const convectToNumber = (str: string) => parseFloat(str.replace(/\D/g, ''));
	const pagesNumber = convectToNumber(storagePages);
	console.log(showMoreBtn, pagesNumber);
	for (let i = 0; i < pagesNumber; i++) {
		const isFirsPage = i == 0;
		let isButtonLoading = showMoreBtn.querySelector(loadingSpinner);

		while (!isFirsPage && isButtonLoading) {
			await new Promise(resolve => setTimeout(resolve, 1000)); // Ждем 1 секунду
			isButtonLoading = showMoreBtn.querySelector(loadingSpinner);
		}

		showMoreBtn.click();
		await new Promise(resolve => setTimeout(resolve, 1000)); // Ждем 1 секунду
	}
}
