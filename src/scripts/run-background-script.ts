interface ErrorResponse {
	error: true;
	content: string;
}

interface SuccessResponse<T> {
	data: T;
	error: false;
	content: string;
}

type Response<T> = ErrorResponse | SuccessResponse<T>;

export async function runBackgroundScript<T>(
	func: (...args: string[]) => any,
	arr?: string[],
): Promise<Response<T>> {
	try {
		let funcResult: T;
		const [tab] = await chrome.tabs.query({
			active: true,
			currentWindow: true,
		});

		if (typeof tab?.id === 'number') {
			const result = await chrome.scripting.executeScript({
				target: { tabId: tab.id },
				func,
				args: arr || [],
			});
			funcResult = result[0]?.result ?? 'Not value';
		} else {
			throw new Error('Active tab not found');
		}

		return {
			error: false,
			content: 'Script executed',
			data: funcResult,
		};
	} catch (e) {
		return {
			error: true,
			content: `Error executing script: ${e}`,
		};
	}
}
