export function isCurrentPage(expectedUrl: string) {
	// Функция проверяет, соответствует ли текущий URL страницы переданному аргументу
	// Возвращает true, если expectedUrl является частью текущего URL (без учета регистра)
	return window.location.href.toLowerCase().includes(expectedUrl.toLowerCase());
}
