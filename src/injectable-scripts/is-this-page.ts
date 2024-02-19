export function isThisPage(url: string) {
	console.log(window.location.href.includes(url.toLowerCase()));
	return window.location.href.includes(url.toLowerCase());
}
