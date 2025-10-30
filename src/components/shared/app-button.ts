import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

export type ButtonVariant =
	| 'primary'
	| 'secondary'
	| 'accent'
	| 'pink'
	| 'cyan'
	| 'success'
	| 'error'
	| 'ghost'
	| 'outlined'
	| 'gradient'

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

@customElement('app-button')
export class AppButton extends LitElement {
	static styles = css`
		:host {
			display: inline-block;
			vertical-align: middle;
		}

		:host([full-width]) {
			display: block;
			width: 100%;
		}

		@keyframes show {
			0% {
				opacity: 0;
				transform: translateY(20px);
			}

			100% {
				opacity: 1;
				transform: translateY(0);
			}
		}

		/* Стили для анимации появления снизу */
		:host([animate]) button {
			animation: show 300ms forwards;
		}

		button {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			gap: 8px;
			width: 100%;
			padding: 12px 24px;
			font-size: 16px;
			font-weight: 600;
			font-family: inherit;
			line-height: 1.5;
			color: white;
			background: linear-gradient(135deg, #9b4fff, #764ba2);
			border: none;
			border-radius: 12px;
			cursor: pointer;
			user-select: none;
			transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
			box-shadow:
				0 4px 12px rgba(155, 79, 255, 0.4),
				0 0 20px rgba(155, 79, 255, 0.3);
			position: relative;
			overflow: hidden;
		}

		button::before {
			content: '';
			position: absolute;
			inset: -2px;
			background: linear-gradient(135deg, #9b4fff, #ff66c3, #00bfff);
			background-size: 200% 200%;
			border-radius: 14px;
			z-index: -1;
			opacity: 0;
			transition: opacity 0.3s ease;
			animation: gradientRotate 3s ease infinite;
		}

		button:hover:not(:disabled) {
			transform: translateY(-2px);
			box-shadow:
				0 8px 20px rgba(155, 79, 255, 0.5),
				0 0 30px rgba(155, 79, 255, 0.4),
				0 0 40px rgba(255, 102, 195, 0.3);
		}

		button:hover:not(:disabled)::before {
			opacity: 1;
		}

		button:active:not(:disabled) {
			transform: translateY(0) scale(0.98);
		}

		button:disabled {
			opacity: 0.5;
			cursor: not-allowed;
			pointer-events: none;
		}

		/* ==========================================
       VARIANTS
       ========================================== */

		/* Primary - фиолетовый с неоном (по умолчанию) */
		:host([variant='primary']) button {
			background: linear-gradient(135deg, #9b4fff, #764ba2);
			box-shadow:
				0 4px 12px rgba(155, 79, 255, 0.4),
				0 0 20px rgba(155, 79, 255, 0.3);
		}

		:host([variant='primary']) button:hover:not(:disabled) {
			box-shadow:
				0 8px 20px rgba(155, 79, 255, 0.5),
				0 0 30px rgba(155, 79, 255, 0.4),
				0 0 40px rgba(255, 102, 195, 0.3);
		}

		/* Secondary - розовый */
		:host([variant='secondary']) button {
			background: linear-gradient(135deg, #ff66c3, #e64db3);
			box-shadow:
				0 4px 12px rgba(255, 102, 195, 0.4),
				0 0 20px rgba(255, 102, 195, 0.3);
		}

		:host([variant='secondary']) button:hover:not(:disabled) {
			box-shadow:
				0 8px 20px rgba(255, 102, 195, 0.5),
				0 0 30px rgba(255, 102, 195, 0.4);
		}

		/* Accent - яркий фиолетовый */
		:host([variant='accent']) button {
			background: #9b4fff;
			box-shadow:
				0 4px 12px rgba(155, 79, 255, 0.4),
				0 0 20px rgba(155, 79, 255, 0.3);
		}

		:host([variant='accent']) button:hover:not(:disabled) {
			background: #ac6dff;
			box-shadow:
				0 8px 20px rgba(155, 79, 255, 0.6),
				0 0 40px rgba(155, 79, 255, 0.5);
		}

		/* Pink */
		:host([variant='pink']) button {
			background: #ff66c3;
			box-shadow:
				0 4px 12px rgba(255, 102, 195, 0.4),
				0 0 20px rgba(255, 102, 195, 0.3);
		}

		:host([variant='pink']) button:hover:not(:disabled) {
			background: #ff80cd;
			box-shadow:
				0 8px 20px rgba(255, 102, 195, 0.6),
				0 0 40px rgba(255, 102, 195, 0.5);
		}

		/* Cyan */
		:host([variant='cyan']) button {
			background: #00bfff;
			box-shadow:
				0 4px 12px rgba(0, 191, 255, 0.4),
				0 0 20px rgba(0, 191, 255, 0.3);
		}

		:host([variant='cyan']) button:hover:not(:disabled) {
			background: #1acbff;
			box-shadow:
				0 8px 20px rgba(0, 191, 255, 0.6),
				0 0 40px rgba(0, 191, 255, 0.5);
		}

		/* Success */
		:host([variant='success']) button {
			background: #25b769;
			box-shadow:
				0 4px 12px rgba(37, 183, 105, 0.4),
				0 0 20px rgba(37, 183, 105, 0.3);
		}

		:host([variant='success']) button:hover:not(:disabled) {
			background: #2ecc71;
			box-shadow:
				0 8px 20px rgba(37, 183, 105, 0.6),
				0 0 40px rgba(37, 183, 105, 0.5);
		}

		/* Error */
		:host([variant='error']) button {
			background: #ff6666;
			box-shadow:
				0 4px 12px rgba(255, 102, 102, 0.4),
				0 0 20px rgba(255, 102, 102, 0.3);
		}

		:host([variant='error']) button:hover:not(:disabled) {
			background: #ff8080;
			box-shadow:
				0 8px 20px rgba(255, 102, 102, 0.6),
				0 0 40px rgba(255, 102, 102, 0.5);
		}

		/* Ghost */
		:host([variant='ghost']) button {
			background: transparent;
			color: #9b4fff;
			box-shadow: none;
		}

		:host([variant='ghost']) button:hover:not(:disabled) {
			background: rgba(155, 79, 255, 0.1);
			box-shadow: 0 0 20px rgba(155, 79, 255, 0.2);
		}

		/* Outlined */
		:host([variant='outlined']) button {
			background: transparent;
			color: #9b4fff;
			border: 2px solid #9b4fff;
			box-shadow: none;
		}

		:host([variant='outlined']) button:hover:not(:disabled) {
			background: rgba(155, 79, 255, 0.1);
			border-color: #ac6dff;
			box-shadow: 0 0 20px rgba(155, 79, 255, 0.3);
		}

		/* Gradient - переливающийся */
		:host([variant='gradient']) button {
			background: linear-gradient(135deg, #9b4fff 0%, #ff66c3 50%, #00bfff 100%);
			background-size: 200% 200%;
			animation: gradientShift 3s ease infinite;
			box-shadow:
				0 4px 12px rgba(155, 79, 255, 0.4),
				0 0 20px rgba(155, 79, 255, 0.3);
		}

		:host([variant='gradient']) button:hover:not(:disabled) {
			box-shadow:
				0 8px 20px rgba(155, 79, 255, 0.5),
				0 0 30px rgba(255, 102, 195, 0.4),
				0 0 40px rgba(0, 191, 255, 0.3);
		}

		/* ==========================================
       SIZES
       ========================================== */

		:host([size='sm']) button {
			padding: 8px 16px;
			font-size: 14px;
			border-radius: 8px;
		}

		:host([size='md']) button {
			padding: 12px 24px;
			font-size: 16px;
			border-radius: 12px;
		}

		:host([size='lg']) button {
			padding: 16px 32px;
			font-size: 18px;
			border-radius: 16px;
		}

		:host([size='xl']) button {
			padding: 20px 40px;
			font-size: 20px;
			border-radius: 16px;
		}

		/* ==========================================
       MODIFIERS
       ========================================== */

		:host([rounded]) button {
			border-radius: 9999px;
		}

		:host([glow]) button {
			box-shadow:
				0 4px 12px rgba(155, 79, 255, 0.5),
				0 0 30px rgba(155, 79, 255, 0.4),
				0 0 50px rgba(155, 79, 255, 0.3);
		}

		:host([glow]) button:hover:not(:disabled) {
			box-shadow:
				0 8px 20px rgba(155, 79, 255, 0.6),
				0 0 40px rgba(255, 102, 195, 0.5),
				0 0 60px rgba(0, 191, 255, 0.4);
		}

		:host([icon-only]) button {
			padding: 12px;
			aspect-ratio: 1;
		}

		:host([icon-only][size='sm']) button {
			padding: 8px;
		}

		:host([icon-only][size='lg']) button {
			padding: 16px;
		}

		:host([icon-only][size='xl']) button {
			padding: 20px;
		}

		:host([pulse]) button {
			animation: pulse 2s ease-in-out infinite;
		}

		/* Loading */
		:host([loading]) button {
			pointer-events: none;
		}

		.loading-spinner {
			display: inline-block;
			width: 16px;
			height: 16px;
			border: 2px solid rgba(255, 255, 255, 0.3);
			border-top-color: white;
			border-radius: 50%;
			animation: spin 0.6s linear infinite;
		}

		:host([loading]) .content {
			opacity: 0.5;
		}

		/* Ripple effect */
		.ripple {
			position: absolute;
			border-radius: 50%;
			background: rgba(255, 255, 255, 0.6);
			transform: scale(0);
			animation: ripple 600ms ease-out;
			pointer-events: none;
		}

		/* ==========================================
       ANIMATIONS
       ========================================== */

		@keyframes gradientShift {
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

		@keyframes gradientRotate {
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

		@keyframes pulse {
			0%,
			100% {
				transform: scale(1);
				box-shadow:
					0 4px 12px rgba(155, 79, 255, 0.4),
					0 0 20px rgba(155, 79, 255, 0.3);
			}
			50% {
				transform: scale(1.05);
				box-shadow:
					0 8px 20px rgba(155, 79, 255, 0.6),
					0 0 40px rgba(255, 102, 195, 0.5);
			}
		}

		@keyframes spin {
			to {
				transform: rotate(360deg);
			}
		}

		@keyframes ripple {
			to {
				transform: scale(4);
				opacity: 0;
			}
		}

		/* ==========================================
       SLOTS
       ========================================== */

		::slotted([slot='prefix']),
		::slotted([slot='suffix']) {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			font-size: 1.2em;
		}

		/* ==========================================
       RESPONSIVE
       ========================================== */

		@media (max-width: 768px) {
			:host([size='lg']) button {
				padding: 14px 28px;
				font-size: 16px;
			}

			:host([size='xl']) button {
				padding: 16px 32px;
				font-size: 18px;
			}
		}
	`

	@property({ type: String, reflect: true })
	variant: ButtonVariant = 'primary'

	@property({ type: String, reflect: true })
	size: ButtonSize = 'md'

	@property({ type: String })
	type: 'button' | 'submit' | 'reset' = 'button'

	@property({ type: Boolean, reflect: true })
	disabled = false

	@property({ type: Boolean, reflect: true })
	loading = false

	@property({ type: Boolean, reflect: true })
	rounded = false

	@property({ type: Boolean, reflect: true })
	glow = false

	@property({ type: Boolean, reflect: true, attribute: 'icon-only' })
	iconOnly = false

	@property({ type: Boolean, reflect: true, attribute: 'full-width' })
	fullWidth = false

	@property({ type: Boolean, reflect: true })
	pulse = false

	@state()
	private ripples: Array<{ x: number; y: number; size: number; id: number }> = []

	private rippleId = 0

	private handleClick(e: MouseEvent) {
		if (this.disabled || this.loading) {
			e.preventDefault()
			e.stopPropagation()
			return
		}

		this.createRipple(e)

		this.dispatchEvent(
			new CustomEvent('button-click', {
				detail: { variant: this.variant },
				bubbles: true,
				composed: true,
			})
		)
	}

	private createRipple(e: MouseEvent) {
		const button = e.currentTarget as HTMLElement
		const rect = button.getBoundingClientRect()
		const size = Math.max(rect.width, rect.height)
		const x = e.clientX - rect.left - size / 2
		const y = e.clientY - rect.top - size / 2

		const ripple = {
			x,
			y,
			size,
			id: this.rippleId++,
		}

		this.ripples = [...this.ripples, ripple]

		setTimeout(() => {
			this.ripples = this.ripples.filter(r => r.id !== ripple.id)
		}, 600)
	}

	render() {
		return html`
			<button
				type=${this.type}
				?disabled=${this.disabled || this.loading}
				@click=${this.handleClick}
				part="button"
			>
				${this.loading ? html`<span class="loading-spinner"></span>` : ''}

				<span class="content">
					<slot name="prefix"></slot>
					<slot></slot>
					<slot name="suffix"></slot>
				</span>

				${this.ripples.map(
					ripple => html`
						<span
							class="ripple"
							style="
                left: ${ripple.x}px;
                top: ${ripple.y}px;
                width: ${ripple.size}px;
                height: ${ripple.size}px;
              "
						></span>
					`
				)}
			</button>
		`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'app-button': AppButton
	}
}
