import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export type TextVariant =
	| 'body-lg' // Большой основной текст
	| 'body' // Обычный основной текст
	| 'body-sm' // Маленький основной текст
	| 'caption' // Подписи
	| 'label' // Метки
	| 'overline' // Надстрочный текст

export type TextColor =
	| 'primary' // Основной цвет текста
	| 'secondary' // Вторичный цвет
	| 'tertiary' // Третичный цвет
	| 'disabled' // Отключенный
	| 'accent' // Акцентный фиолетовый
	| 'pink' // Розовый акцент
	| 'cyan' // Голубой акцент
	| 'success' // Успех
	| 'warning' // Предупреждение
	| 'error' // Ошибка
	| 'inverse' // Инверсный

export type TextAlign = 'left' | 'center' | 'right' | 'justify'
export type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold'

/**
 * Универсальный компонент для текста
 *
 * @element app-text
 * @slot - Контент текста
 *
 * @example
 * ```html
 * <app-text variant="body" color="primary">Обычный текст</app-text>
 * <app-text variant="caption" color="secondary">Маленький текст</app-text>
 * <app-text color="accent" weight="bold">Акцентный текст</app-text>
 * ```
 */
@customElement('app-text')
export class AppText extends LitElement {
	static styles = css`
		:host {
			display: inline;
			color: var(--text-color, var(--color-text-primary));
			font-weight: var(--text-weight, 400);
			text-align: var(--text-align, left);
			line-height: var(--text-line-height, 1.5);
			letter-spacing: var(--text-letter-spacing, normal);
		}

		:host([block]) {
			display: block;
		}

		/* ==========================================
       VARIANTS - Варианты размеров
       ========================================== */

		:host([variant='body-lg']) {
			font-size: 18px;
			line-height: 1.6;
			--text-line-height: 1.6;
		}

		:host([variant='body']) {
			font-size: 16px;
			line-height: 1.5;
			--text-line-height: 1.5;
		}

		:host([variant='body-sm']) {
			font-size: 14px;
			line-height: 1.5;
			--text-line-height: 1.5;
		}

		:host([variant='caption']) {
			font-size: 12px;
			line-height: 1.4;
			--text-line-height: 1.4;
		}

		:host([variant='label']) {
			font-size: 14px;
			line-height: 1.4;
			font-weight: 500;
			letter-spacing: 0.02em;
			--text-line-height: 1.4;
			--text-weight: 500;
			--text-letter-spacing: 0.02em;
		}

		:host([variant='overline']) {
			font-size: 12px;
			line-height: 1.4;
			font-weight: 600;
			letter-spacing: 0.08em;
			text-transform: uppercase;
			--text-line-height: 1.4;
			--text-weight: 600;
			--text-letter-spacing: 0.08em;
		}

		/* ==========================================
       COLORS - Цвета текста
       ========================================== */

		:host([color='primary']) {
			--text-color: var(--color-text-primary);
		}

		:host([color='secondary']) {
			--text-color: var(--color-text-secondary);
		}

		:host([color='tertiary']) {
			--text-color: var(--color-text-tertiary);
		}

		:host([color='disabled']) {
			--text-color: var(--color-text-disabled);
		}

		:host([color='accent']) {
			--text-color: var(--color-primary-500);
		}

		:host([color='pink']) {
			--text-color: var(--color-secondary-500);
		}

		:host([color='cyan']) {
			--text-color: var(--color-accent-500);
		}

		:host([color='success']) {
			--text-color: var(--color-success-500);
		}

		:host([color='warning']) {
			--text-color: var(--color-warning-500);
		}

		:host([color='error']) {
			--text-color: var(--color-error-500);
		}

		:host([color='inverse']) {
			--text-color: var(--color-text-inverse);
		}

		/* ==========================================
       WEIGHT - Толщина шрифта
       ========================================== */

		:host([weight='light']) {
			--text-weight: 300;
		}

		:host([weight='normal']) {
			--text-weight: 400;
		}

		:host([weight='medium']) {
			--text-weight: 500;
		}

		:host([weight='semibold']) {
			--text-weight: 600;
		}

		:host([weight='bold']) {
			--text-weight: 700;
		}

		/* ==========================================
       ALIGNMENT - Выравнивание
       ========================================== */

		:host([align='left']) {
			--text-align: left;
		}

		:host([align='center']) {
			--text-align: center;
		}

		:host([align='right']) {
			--text-align: right;
		}

		:host([align='justify']) {
			--text-align: justify;
		}

		/* ==========================================
       SPECIAL EFFECTS - Специальные эффекты
       ========================================== */

		:host([gradient]) {
			background: var(--effect-holographic);
			background-size: 200% 200%;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
		}

		:host([gradient][animated]) {
			animation: holographic 3s ease-in-out infinite;
		}

		:host([glow]) {
			text-shadow:
				0 0 10px currentColor,
				0 0 20px currentColor,
				0 0 30px currentColor;
		}

		:host([italic]) {
			font-style: italic;
		}

		:host([underline]) {
			text-decoration: underline;
		}

		:host([strike]) {
			text-decoration: line-through;
		}

		:host([truncate]) {
			display: block;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		:host([uppercase]) {
			text-transform: uppercase;
		}

		:host([lowercase]) {
			text-transform: lowercase;
		}

		:host([capitalize]) {
			text-transform: capitalize;
		}

		/* Анимация для градиента */
		@keyframes holographic {
			0% {
				background-position: 0% 50%;
			}
			50% {
				background-position: 100% 50%;
			}
			100% {
				background-position: 0% 50%;
			}
		}
	`

	@property({ type: String, reflect: true })
	variant: TextVariant = 'body'

	@property({ type: String, reflect: true })
	color: TextColor = 'primary'

	@property({ type: String, reflect: true })
	align?: TextAlign

	@property({ type: String, reflect: true })
	weight?: TextWeight

	@property({ type: Boolean, reflect: true })
	block = false

	@property({ type: Boolean, reflect: true })
	gradient = false

	@property({ type: Boolean, reflect: true })
	animated = false

	@property({ type: Boolean, reflect: true })
	glow = false

	@property({ type: Boolean, reflect: true })
	italic = false

	@property({ type: Boolean, reflect: true })
	underline = false

	@property({ type: Boolean, reflect: true })
	strike = false

	@property({ type: Boolean, reflect: true })
	truncate = false

	@property({ type: Boolean, reflect: true })
	uppercase = false

	@property({ type: Boolean, reflect: true })
	lowercase = false

	@property({ type: Boolean, reflect: true })
	capitalize = false

	render() {
		return html`<slot></slot>`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'app-text': AppText
	}
}
