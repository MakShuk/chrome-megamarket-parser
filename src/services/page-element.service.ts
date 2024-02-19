export type ElementType = HTMLDivElement;
export type RunFunction = () => void;
interface Error {
	error: true;
	content: string;
}

interface ActionSuccess<T> {
	data?: T;
	error: false;
	content: string;
}
interface ElementGetSuccess<E extends HTMLElement> {
	element: E;
	error: boolean;
	content: string;
}

type ActionStatus<T> = Error | ActionSuccess<T>;
type ElementStatus<E extends HTMLElement> = Error | ElementGetSuccess<E>;

export class PageElementService<E extends HTMLElement> {
	constructor(public selector: string) {
		this.node = this.getElement();
	}

	node: ElementStatus<E>;

	private getElement<E extends HTMLElement>(): ElementStatus<E> {
		try {
			const element = document.querySelector(this.selector) as E;
			if (!element) {
				throw new Error(`Элемент ${this.selector} не найден`);
			} else {
				return { element: element, content: 'Элемент получен', error: false };
			}
		} catch (error) {
			return { error: true, content: `${error}` };
		}
	}

	public getTextContent<T>(): ActionStatus<T> {
		try {
			if (this.node.error) throw new Error(this.node.content);
			let textContent: string = '';
			if (this.node.element && this.node.element.textContent) {
				textContent = this.node.element.textContent;
			}
			return { error: false, content: textContent };
		} catch (error) {
			return { error: true, content: `${error}` };
		}
	}

	public setTextContent<T>(value: string | number): ActionStatus<T> {
		try {
			if ('element' in this.node) {
				this.node.element.textContent = String(value);
			} else {
				throw new Error(this.node.content);
			}

			return { error: false, content: `Значение: ${value} - записано` };
		} catch (error) {
			return { error: true, content: `${error}` };
		}
	}

	addEvent(runFunction: RunFunction, typeEvent?: 'click' | 'focus' | 'input' | 'blur') {
		try {
			if (this.node.error) throw new Error(this.node.content);
			if (!this.node.element) throw new Error(this.node.content);
			this.node.element.addEventListener(typeEvent || 'click', () => {
				runFunction();
			});
			return { error: false, content: `Событие добелено` };
		} catch (error) {
			return { error: true, content: `${error}` };
		}
	}

	public hide(hideStatus: boolean, display: '' | 'grid' | 'flex' = '') {
		try {
			if (this.node.error) throw new Error(this.node.content);
			if (!this.node.element) throw new Error(this.node.content);
			const status = hideStatus ? 'none' : display;
			this.node.element.style.display = status;
			return { error: false, content: `Элемент срыт: ${hideStatus}` };
		} catch (error) {
			return { error: true, content: `${error}` };
		}
	}

	public addHTML(html: string, rewrite?: boolean) {
		try {
			if (this.node.error) throw new Error(this.node.content);
			if (!this.node.element) throw new Error(this.node.content);

			if (!rewrite) this.node.element.innerHTML += html;
			if (rewrite) this.node.element.innerHTML = html;

			return { error: false, content: `Добавлен HTML: ${html.slice(0, 10)}...` };
		} catch (error) {
			return { error: true, content: `${error}` };
		}
	}

	public getValue<T>(): ActionStatus<T> {
		try {
			if (this.node.error) throw new Error(this.node.content);
			let textContent: string = '';
			const el = this.node.element;

			if (el && 'value' in el && typeof el.value === 'string' && el.value.length > 0) {
				textContent = el.value;
			} else {
				throw new Error('Значение value не задано');
			}
			return { error: false, content: textContent };
		} catch (error) {
			return { error: true, content: `${error}` };
		}
	}

	public setValue<T>(content: string): ActionStatus<T> {
		try {
			if (this.node.error) throw new Error(this.node.content);
			const el = this.node.element;

			if (el && 'value' in el && typeof el.value === 'string') {
				el.value = content;
			} else {
				throw new Error('Значение value не задано');
			}
			return { error: false, content: `Значение value: ${content} заданно` };
		} catch (error) {
			return { error: true, content: `${error}` };
		}
	}

	public isChecked<T>(): ActionStatus<T> & { isChecked: boolean } {
		try {
			if (this.node.error) throw new Error(this.node.content);

			const el = this.node.element;
			let isChecked;

			if (el && 'checked' in el && typeof el.checked === 'boolean') {
				isChecked = el.checked as boolean;
			} else {
				throw new Error('Значение value не задано');
			}
			return { error: false, content: 'Поле отмечено', isChecked };
		} catch (error) {
			return { error: true, content: `${error}`, isChecked: false };
		}
	}

	public focus(): void {
		if ('element' in this.node) {
			this.node.element?.focus();
		}
	}
}
