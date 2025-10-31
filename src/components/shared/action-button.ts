import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

export type ActionButtonVariant =
	| 'primary'
	| 'secondary'
	| 'accent'
	| 'success'
	| 'error'
	| 'warning'
	| 'ghost'

export type ActionButtonSize = 'sm' | 'md' | 'lg' | 'xl'

@customElement('action-button')
export class ActionButton extends LitElement {
	static styles = css`
		:host {
			display: inline-block;
			width: var(--button-size, 48px);
		}

		button {
			position: relative;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: var(--button-size, 48px);
			height: var(--button-size, 48px);
			padding: 0;
			border: none;
			border-radius: var(--radius-full);
			background: var(--color-primary-500);
			color: var(--color-text-primary);
			cursor: pointer;
			transition: all var(--transition-base);
			box-shadow: var(--shadow-md);
			overflow: hidden;
			font-family: inherit;
			outline: none;
		}

		button::before {
			content: '';
			position: absolute;
			inset: 0;
			background: var(--effect-holographic);
			background-size: 400% 400%;
			opacity: 0;
			transition: opacity var(--transition-base);
			animation: holographic 3s ease-in-out infinite;
			border-radius: inherit;
		}

		button:hover::before {
			opacity: 0.2;
		}

		button:hover {
			transform: translateY(-2px) scale(1.05);
			box-shadow: var(--shadow-lg), var(--shadow-glow-purple);
		}

		button:active {
			transform: translateY(0) scale(0.95);
			box-shadow: var(--shadow-sm);
		}

		button:focus-visible {
			outline: 2px solid var(--color-border-focus);
			outline-offset: 2px;
		}

		button:disabled {
			opacity: 0.5;
			cursor: not-allowed;
			pointer-events: none;
		}

		.icon-wrapper {
			position: relative;
			z-index: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
		}

		/* ==========================================
		   VARIANTS
		   ========================================== */

		:host([variant='primary']) button {
			background: var(--color-primary-500);
		}

		:host([variant='primary']) button:hover {
			background: var(--color-primary-400);
			box-shadow: var(--shadow-lg), var(--shadow-glow-purple);
		}

		:host([variant='secondary']) button {
			background: var(--color-secondary-500);
		}

		:host([variant='secondary']) button:hover {
			background: var(--color-secondary-400);
			box-shadow: var(--shadow-lg), var(--shadow-glow-pink);
		}

		:host([variant='accent']) button {
			background: var(--color-accent-500);
		}

		:host([variant='accent']) button:hover {
			background: var(--color-accent-400);
			box-shadow: var(--shadow-lg), var(--shadow-glow-cyan);
		}

		:host([variant='success']) button {
			background: var(--color-success-500);
		}

		:host([variant='success']) button:hover {
			background: var(--color-success-400);
		}

		:host([variant='error']) button {
			background: var(--color-error-500);
		}

		:host([variant='error']) button:hover {
			background: var(--color-error-400);
		}

		:host([variant='warning']) button {
			background: var(--color-warning-500);
			color: var(--color-text-inverse);
		}

		:host([variant='warning']) button:hover {
			background: var(--color-warning-400);
		}

		:host([variant='ghost'][ghost-color='purple']) button {
			background: rgba(155, 79, 255, 0.1);
		}

		:host([variant='ghost'][ghost-color='purple']) button:hover {
			background: rgba(155, 79, 255, 0.2);
			box-shadow: var(--shadow-glow-purple);
		}

		:host([variant='ghost'][ghost-color='pink']) button {
			background: rgba(255, 102, 195, 0.1);
		}

		:host([variant='ghost'][ghost-color='pink']) button:hover {
			background: rgba(255, 102, 195, 0.2);
			box-shadow: var(--shadow-glow-pink);
		}

		:host([variant='ghost'][ghost-color='cyan']) button {
			background: rgba(0, 191, 255, 0.1);
		}

		:host([variant='ghost'][ghost-color='cyan']) button:hover {
			background: rgba(0, 191, 255, 0.2);
			box-shadow: var(--shadow-glow-cyan);
		}

		/* ==========================================
		   SIZES
		   ========================================== */

		:host([size='sm']) button {
			--button-size: 32px;
			font-size: 14px;
		}

		:host([size='md']) button {
			--button-size: 48px;
			font-size: 18px;
		}

		:host([size='lg']) button {
			--button-size: 64px;
			font-size: 24px;
		}

		:host([size='xl']) button {
			--button-size: 80px;
			font-size: 32px;
		}

		/* ==========================================
		   MODIFIERS
		   ========================================== */

		:host([glow]) button {
			box-shadow: var(--shadow-lg), var(--shadow-glow-purple);
		}

		:host([pulse]) button {
			animation: pulse-button 2s ease-in-out infinite;
		}

		@keyframes pulse-button {
			0%,
			100% {
				box-shadow: var(--shadow-md);
			}
			50% {
				box-shadow: var(--shadow-lg), var(--shadow-glow-purple);
			}
		}

		:host([rotate]) button:hover .icon-wrapper {
			animation: rotate-icon 0.6s ease;
		}

		@keyframes rotate-icon {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}

		:host([bounce]) button:active .icon-wrapper {
			animation: bounce-icon 0.4s ease;
		}

		@keyframes bounce-icon {
			0%,
			100% {
				transform: scale(1);
			}
			50% {
				transform: scale(1.2);
			}
		}

		/* Ripple effect */
		.ripple {
			position: absolute;
			border-radius: var(--radius-full);
			background: rgba(255, 255, 255, 0.6);
			transform: scale(0);
			animation: ripple-animation 600ms ease-out;
			pointer-events: none;
		}

		@keyframes ripple-animation {
			to {
				transform: scale(4);
				opacity: 0;
			}
		}

		/* ==========================================
		   BADGE (для уведомлений)
		   ========================================== */

		.badge {
			position: absolute;
			top: -4px;
			right: -4px;
			min-width: 18px;
			height: 18px;
			padding: 0 4px;
			display: flex;
			align-items: center;
			justify-content: center;
			background: var(--color-error-500);
			color: var(--color-text-primary);
			font-size: 11px;
			font-weight: 600;
			border-radius: var(--radius-full);
			border: 2px solid var(--color-bg-primary);
			z-index: 2;
			box-shadow: var(--shadow-md);
		}

		.badge.pulse {
			animation: pulse-badge 1.5s ease-in-out infinite;
		}

		@keyframes pulse-badge {
			0%,
			100% {
				transform: scale(1);
			}
			50% {
				transform: scale(1.1);
			}
		}

		/* ==========================================
		   LOADING STATE
		   ========================================== */

		:host([loading]) button {
			pointer-events: none;
		}

		.spinner {
			position: absolute;
			width: 60%;
			height: 60%;
			border: 2px solid rgba(255, 255, 255, 0.3);
			border-top-color: var(--color-text-primary);
			border-radius: var(--radius-full);
			animation: spin 0.8s linear infinite;
		}

		@keyframes spin {
			to {
				transform: rotate(360deg);
			}
		}

		:host([loading]) .icon-wrapper {
			opacity: 0.3;
		}
	`

	@property({ type: String, reflect: true })
	ghostColor: 'purple' | 'pink' | 'cyan' = 'purple'

	@property({ type: String, reflect: true })
	variant: ActionButtonVariant = 'primary'

	@property({ type: String, reflect: true })
	size: ActionButtonSize = 'md'

	@property({ type: String })
	type: 'button' | 'submit' | 'reset' = 'button'

	@property({ type: Boolean, reflect: true })
	disabled = false

	@property({ type: Boolean, reflect: true })
	loading = false

	@property({ type: Boolean, reflect: true })
	glow = false

	@property({ type: Boolean, reflect: true })
	pulse = false

	@property({ type: Boolean, reflect: true })
	rotate = false

	@property({ type: Boolean, reflect: true })
	bounce = false

	@property({ type: String })
	badge = ''

	@property({ type: String })
	ariaLabel = ''

	@state()
	private ripples: Array<{ x: number; y: number; size: number; id: number }> = []

	private rippleId = 0

	private handleClick(e: MouseEvent) {
		console.log(this)

		if (this.disabled || this.loading) {
			e.preventDefault()
			e.stopPropagation()
			return
		}

		this.createRipple(e)

		this.dispatchEvent(
			new CustomEvent('action-click', {
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
				aria-label=${this.ariaLabel}
				part="button"
			>
				${this.loading ? html`<div class="spinner"></div>` : ''}

				<div class="icon-wrapper">
					<slot></slot>
				</div>

				${this.badge ? html`<span class="badge pulse">${this.badge}</span>` : ''}
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
		'action-button': ActionButton
	}
}
