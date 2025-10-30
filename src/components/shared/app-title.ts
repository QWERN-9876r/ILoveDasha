import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export type TitleLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'display'
export type TitleColor = 'primary' | 'secondary' | 'accent' | 'pink' | 'cyan' | 'gradient'

@customElement('app-title')
export class AppTitle extends LitElement {
	static styles = css`
		:host {
			display: block;
			margin: 0 0 16px 0;
		}

		.title {
			display: flex;
			align-items: center;
			gap: 8px;
			margin: 0;
			padding: 0;
			font-weight: 700;
			line-height: 1.2;
			letter-spacing: -0.02em;
		}

		.content {
			flex: 1;
		}

		/* ==========================================
       TITLE LEVELS - Уровни заголовков
       ========================================== */

		:host([level='display']) .title {
			font-size: clamp(48px, 8vw, 72px);
			line-height: 1.1;
			font-weight: 900;
			letter-spacing: -0.04em;
		}

		:host([level='h1']) .title {
			font-size: clamp(32px, 5vw, 48px);
			line-height: 1.15;
			font-weight: 800;
			letter-spacing: -0.03em;
		}

		:host([level='h2']) .title {
			font-size: clamp(28px, 4vw, 40px);
			line-height: 1.2;
			font-weight: 700;
			letter-spacing: -0.02em;
		}

		:host([level='h3']) .title {
			font-size: clamp(24px, 3.5vw, 32px);
			line-height: 1.25;
			font-weight: 700;
			letter-spacing: -0.01em;
		}

		:host([level='h4']) .title {
			font-size: clamp(20px, 3vw, 24px);
			line-height: 1.3;
			font-weight: 600;
			letter-spacing: 0;
		}

		:host([level='h5']) .title {
			font-size: clamp(18px, 2.5vw, 20px);
			line-height: 1.4;
			font-weight: 600;
			letter-spacing: 0;
		}

		:host([level='h6']) .title {
			font-size: clamp(16px, 2vw, 18px);
			line-height: 1.4;
			font-weight: 600;
			letter-spacing: 0.01em;
		}

		/* ==========================================
       COLORS - Цвета заголовков
       ========================================== */

		:host([color='primary']) .title {
			color: var(--color-text-primary, #ffffff);
		}

		:host([color='secondary']) .title {
			color: var(--color-text-secondary, #b8b8c8);
		}

		:host([color='accent']) .title {
			color: var(--color-primary-500, #9b4fff);
		}

		:host([color='pink']) .title {
			color: var(--color-secondary-500, #ff66c3);
		}

		:host([color='cyan']) .title {
			color: var(--color-accent-500, #00bfff);
		}

		:host([color='gradient']) .title {
			background: linear-gradient(135deg, #9b4fff 0%, #ff66c3 50%, #00bfff 100%);
			background-size: 200% 200%;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
		}

		/* ==========================================
       ALIGNMENT - Выравнивание
       ========================================== */

		:host([align='left']) .title {
			justify-content: flex-start;
			text-align: left;
		}

		:host([align='center']) .title {
			justify-content: center;
			text-align: center;
		}

		:host([align='right']) .title {
			justify-content: flex-end;
			text-align: right;
		}

		/* ==========================================
       SPECIAL EFFECTS - Специальные эффекты
       ========================================== */

		:host([gradient]) .title {
			background: linear-gradient(135deg, #9b4fff 0%, #ff66c3 50%, #00bfff 100%);
			background-size: 200% 200%;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
		}

		:host([gradient][animated]) .title {
			animation: holographic 3s ease-in-out infinite;
		}

		:host([glow]) .title {
			text-shadow:
				0 0 20px var(--color-primary-500, #9b4fff),
				0 0 40px var(--color-primary-500, #9b4fff),
				0 0 60px var(--color-primary-400, #ac6dff);
			animation: glow-pulse 2s ease-in-out infinite;
		}

		:host([underline]) .title {
			padding-bottom: 8px;
			border-bottom: 3px solid currentColor;
		}

		:host([uppercase]) .title {
			text-transform: uppercase;
		}

		:host([truncate]) .title {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		/* Spacing modifiers */
		:host([spacing='none']) {
			margin: 0;
		}

		:host([spacing='sm']) {
			margin: 0 0 8px 0;
		}

		:host([spacing='md']) {
			margin: 0 0 16px 0;
		}

		:host([spacing='lg']) {
			margin: 0 0 24px 0;
		}

		/* ==========================================
       ANIMATIONS - Анимации
       ========================================== */

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

		@keyframes glow-pulse {
			0%,
			100% {
				text-shadow:
					0 0 20px var(--color-primary-500, #9b4fff),
					0 0 40px var(--color-primary-500, #9b4fff),
					0 0 60px var(--color-primary-400, #ac6dff);
			}
			50% {
				text-shadow:
					0 0 30px var(--color-secondary-500, #ff66c3),
					0 0 60px var(--color-secondary-500, #ff66c3),
					0 0 90px var(--color-secondary-400, #ff80cd);
			}
		}

		/* ==========================================
       SLOTS - Стили для слотов
       ========================================== */

		::slotted([slot='prefix']),
		::slotted([slot='suffix']) {
			display: inline-flex;
			align-items: center;
			justify-content: center;
		}

		::slotted([slot='prefix']) {
			margin-right: 8px;
		}

		::slotted([slot='suffix']) {
			margin-left: 8px;
		}
	`

	@property({ type: String, reflect: true })
	level: TitleLevel = 'h2'

	@property({ type: String, reflect: true })
	color: TitleColor = 'primary'

	@property({ type: String, reflect: true })
	align?: 'left' | 'center' | 'right'

	@property({ type: String, reflect: true })
	spacing?: 'none' | 'sm' | 'md' | 'lg' = 'md'

	@property({ type: Boolean, reflect: true })
	gradient = false

	@property({ type: Boolean, reflect: true })
	animated = false

	@property({ type: Boolean, reflect: true })
	glow = false

	@property({ type: Boolean, reflect: true })
	underline = false

	@property({ type: Boolean, reflect: true })
	uppercase = false

	@property({ type: Boolean, reflect: true })
	truncate = false

	// ✅ ПРАВИЛЬНО - статические теги с условиями
	render() {
		const content = html`
			<slot name="prefix"></slot>
			<span class="content" part="content">
				<slot></slot>
			</span>
			<slot name="suffix"></slot>
		`

		// Используем switch для выбора правильного тега
		switch (this.level) {
			case 'display':
			case 'h1':
				return html`<h1 class="title" part="title">${content}</h1>`
			case 'h2':
				return html`<h2 class="title" part="title">${content}</h2>`
			case 'h3':
				return html`<h3 class="title" part="title">${content}</h3>`
			case 'h4':
				return html`<h4 class="title" part="title">${content}</h4>`
			case 'h5':
				return html`<h5 class="title" part="title">${content}</h5>`
			case 'h6':
				return html`<h6 class="title" part="title">${content}</h6>`
			default:
				return html`<h2 class="title" part="title">${content}</h2>`
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'app-title': AppTitle
	}
}
