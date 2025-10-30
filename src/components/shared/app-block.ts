import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export type BlockVariant =
	| 'default' // Обычный блок
	| 'card' // Карточка с тенью
	| 'elevated' // Приподнятый блок
	| 'outlined' // С обводкой
	| 'glass' // Стеклянный эффект
	| 'glow' // С неоновым свечением

export type BlockPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl'
export type BlockRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

/**
 * Универсальный блок-контейнер
 *
 * @element app-block
 * @slot - Основной контент блока
 * @slot header - Заголовок блока
 * @slot footer - Подвал блока
 *
 * @example
 * ```html
 * <app-block variant="card" padding="lg">
 *   <h2 slot="header">Заголовок</h2>
 *   Контент карточки
 *   <div slot="footer">Футер</div>
 * </app-block>
 * ```
 */
@customElement('app-block')
export class AppBlock extends LitElement {
	static styles = css`
		:host {
			display: block;
			position: relative;
		}

		.block {
			width: 100%;
			height: 100%;
			background: var(--block-bg, var(--color-bg-secondary));
			border-radius: var(--block-radius, var(--radius-md));
			padding: var(--block-padding, var(--spacing-md));
			transition: var(--transition-base);
			position: relative;
			overflow: hidden;
		}

		/* ==========================================
       VARIANTS - Варианты блоков
       ========================================== */

		/* Default */
		:host([variant='default']) .block {
			--block-bg: var(--color-bg-secondary);
		}

		/* Card - карточка с тенью */
		:host([variant='card']) .block {
			--block-bg: var(--color-bg-tertiary);
			background: var(--color-bg-gradient-card);
			box-shadow: var(--shadow-md);
			border: 1px solid var(--color-border-primary);
		}

		:host([variant='card']:hover) .block {
			box-shadow: var(--shadow-lg);
			transform: translateY(-2px);
		}

		/* Elevated - приподнятый */
		:host([variant='elevated']) .block {
			--block-bg: var(--color-bg-elevated);
			box-shadow: var(--shadow-lg);
			border: 1px solid var(--color-border-secondary);
		}

		:host([variant='elevated']:hover) .block {
			box-shadow: var(--shadow-xl);
			transform: translateY(-4px);
		}

		/* Outlined - с обводкой */
		:host([variant='outlined']) .block {
			--block-bg: transparent;
			border: 2px solid var(--color-border-primary);
			background: transparent;
		}

		:host([variant='outlined']:hover) .block {
			border-color: var(--color-primary-500);
			background: rgba(155, 79, 255, 0.05);
		}

		/* Glass - стеклянный эффект */
		:host([variant='glass']) .block {
			background: var(--effect-glass-bg);
			backdrop-filter: var(--effect-glass-blur);
			-webkit-backdrop-filter: var(--effect-glass-blur);
			border: 1px solid var(--effect-glass-border);
			box-shadow: var(--shadow-lg);
		}

		/* Glow - неоновое свечение */
		:host([variant='glow']) .block {
			--block-bg: var(--color-bg-tertiary);
			background: var(--color-bg-gradient-card);
			border: 2px solid var(--color-primary-500);
			box-shadow: var(--shadow-glow-purple);
		}

		:host([variant='glow']:hover) .block {
			box-shadow: var(--shadow-glow-pink);
			border-color: var(--color-secondary-500);
		}

		/* ==========================================
       PADDING - Отступы
       ========================================== */

		:host([padding='none']) .block {
			--block-padding: 0;
		}

		:host([padding='sm']) .block {
			--block-padding: var(--spacing-sm);
		}

		:host([padding='md']) .block {
			--block-padding: var(--spacing-md);
		}

		:host([padding='lg']) .block {
			--block-padding: var(--spacing-lg);
		}

		:host([padding='xl']) .block {
			--block-padding: var(--spacing-xl);
		}

		/* ==========================================
       RADIUS - Скругление углов
       ========================================== */

		:host([radius='none']) .block {
			--block-radius: 0;
		}

		:host([radius='sm']) .block {
			--block-radius: var(--radius-sm);
		}

		:host([radius='md']) .block {
			--block-radius: var(--radius-md);
		}

		:host([radius='lg']) .block {
			--block-radius: var(--radius-lg);
		}

		:host([radius='xl']) .block {
			--block-radius: var(--radius-xl);
		}

		:host([radius='full']) .block {
			--block-radius: var(--radius-full);
		}

		/* ==========================================
       MODIFIERS - Модификаторы
       ========================================== */

		/* Интерактивный - с hover эффектом */
		:host([interactive]) .block {
			cursor: pointer;
			user-select: none;
		}

		:host([interactive]:hover) .block {
			background: var(--color-bg-hover);
		}

		:host([interactive]:active) .block {
			transform: scale(0.98);
		}

		/* Центрирование контента */
		:host([centered]) .block {
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
		}

		/* Полная ширина */
		:host([full-width]) {
			width: 100%;
		}

		/* Полная высота */
		:host([full-height]) {
			height: 100%;
		}

		/* Отключенный */
		:host([disabled]) .block {
			opacity: 0.5;
			cursor: not-allowed;
			pointer-events: none;
		}

		/* Анимация появления */
		:host([animated]) .block {
			animation: fadeInUp 0.5s ease-out;
		}

		/* Градиентная обводка */
		:host([gradient-border]) .block {
			border: 2px solid transparent;
			background-clip: padding-box;
			position: relative;
		}

		:host([gradient-border]) .block::before {
			content: '';
			position: absolute;
			inset: -2px;
			background: var(--effect-holographic);
			background-size: 200% 200%;
			border-radius: inherit;
			z-index: -1;
			animation: holographic 3s ease-in-out infinite;
		}

		/* Эффект hover с масштабированием */
		:host([hover-scale]) .block {
			transition: transform var(--transition-bounce);
		}

		:host([hover-scale]:hover) .block {
			transform: scale(1.02);
		}

		/* Эффект hover с подъёмом */
		:host([hover-lift]) .block {
			transition: all var(--transition-base);
		}

		:host([hover-lift]:hover) .block {
			transform: translateY(-8px);
			box-shadow: var(--shadow-xl);
		}

		/* ==========================================
       SLOTS - Структура с header/footer
       ========================================== */

		.block-header {
			margin-bottom: var(--spacing-md);
			padding-bottom: var(--spacing-sm);
			border-bottom: 1px solid var(--color-border-primary);
		}

		.block-header:empty {
			display: none;
		}

		.block-content {
			flex: 1;
		}

		.block-footer {
			margin-top: var(--spacing-md);
			padding-top: var(--spacing-sm);
			border-top: 1px solid var(--color-border-primary);
		}

		.block-footer:empty {
			display: none;
		}

		/* Если есть header или footer, делаем flex */
		:host([has-header]) .block,
		:host([has-footer]) .block {
			display: flex;
			flex-direction: column;
		}

		/* ==========================================
       ANIMATIONS - Анимации
       ========================================== */

		@keyframes fadeInUp {
			from {
				opacity: 0;
				transform: translateY(20px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}

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

		/* ==========================================
       RESPONSIVE - Адаптивность
       ========================================== */

		@media (max-width: 768px) {
			:host([padding='lg']) .block {
				--block-padding: var(--spacing-md);
			}

			:host([padding='xl']) .block {
				--block-padding: var(--spacing-lg);
			}
		}
	`

	@property({ type: String, reflect: true })
	variant: BlockVariant = 'default'

	@property({ type: String, reflect: true })
	padding: BlockPadding = 'md'

	@property({ type: String, reflect: true })
	radius: BlockRadius = 'md'

	@property({ type: Boolean, reflect: true })
	interactive = false

	@property({ type: Boolean, reflect: true })
	centered = false

	@property({ type: Boolean, reflect: true, attribute: 'full-width' })
	fullWidth = false

	@property({ type: Boolean, reflect: true, attribute: 'full-height' })
	fullHeight = false

	@property({ type: Boolean, reflect: true })
	disabled = false

	@property({ type: Boolean, reflect: true })
	animated = false

	@property({ type: Boolean, reflect: true, attribute: 'gradient-border' })
	gradientBorder = false

	@property({ type: Boolean, reflect: true, attribute: 'hover-scale' })
	hoverScale = false

	@property({ type: Boolean, reflect: true, attribute: 'hover-lift' })
	hoverLift = false

	private handleClick(e: Event) {
		if (this.disabled) {
			e.preventDefault()
			e.stopPropagation()
			return
		}

		this.dispatchEvent(
			new CustomEvent('block-click', {
				detail: { variant: this.variant },
				bubbles: true,
				composed: true,
			})
		)
	}

	render() {
		return html`
			<div class="block" part="block" @click=${this.handleClick}>
				<div class="block-header" part="header">
					<slot name="header"></slot>
				</div>

				<div class="block-content" part="content">
					<slot></slot>
				</div>

				<div class="block-footer" part="footer">
					<slot name="footer"></slot>
				</div>
			</div>
		`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'app-block': AppBlock
	}
}
