import { css } from 'lit'

export const styles = css`
	:host {
		display: block;
		width: 100%;

		width: calc(100dvw - 40px);
		max-width: calc(var(--max-layout-width) - 40px);
	}

	.answer-wrapper {
		position: relative;
		width: 100%;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.answer-wrapper:hover:not(.disabled) {
		transform: translateX(8px);
	}

	.answer-wrapper.disabled {
		pointer-events: none;
		opacity: 0.6;
	}

	.answer-wrapper.correct {
		animation: correctPulse 0.6s ease-out;
	}

	.answer-wrapper.incorrect {
		animation: incorrectShake 0.5s ease-out;
	}

	/* Контент ответа */
	.answer-content {
		display: flex;
		align-items: center;
		padding: 20px;
		gap: 16px;
		background: var(--color-bg-tertiary, #1a1a26);
		border-radius: 12px;
		border: 2px solid var(--color-border-primary, #2a2a3a);
		transition: all 0.3s ease;
	}

	.answer-wrapper:hover:not(.disabled) .answer-content {
		border-color: var(--color-primary-500, #9b4fff);
		background: var(--color-bg-elevated, #20202e);
		box-shadow: 0 0 20px rgba(155, 79, 255, 0.3);
	}

	/* Состояния */
	.answer-wrapper.correct .answer-content {
		border-color: var(--color-success-500, #25b769);
		background: rgba(37, 183, 105, 0.1);
		box-shadow: 0 0 30px rgba(37, 183, 105, 0.4);
	}

	.answer-wrapper.correct .answer-content:hover {
		border-color: var(--color-success-500, #25b769);
		background: rgba(37, 183, 105, 0.1);
		box-shadow: 0 0 30px rgba(37, 183, 105, 0.4);
	}

	.answer-wrapper.incorrect .answer-content {
		border-color: var(--color-error-500, #ff6666);
		background: rgba(255, 102, 102, 0.1);
		box-shadow: 0 0 30px rgba(255, 102, 102, 0.4);
	}

	.answer-wrapper.incorrect .answer-content:hover {
		border-color: var(--color-error-500, #ff6666);
		background: rgba(255, 102, 102, 0.1);
		box-shadow: 0 0 30px rgba(255, 102, 102, 0.4);
	}

	/* Буква */
	.answer-letter {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 48px;
		height: 48px;
		background: linear-gradient(135deg, #9b4fff, #764ba2);
		color: white;
		border-radius: 12px;
		font-weight: 700;
		font-size: 20px;
		box-shadow: 0 4px 12px rgba(155, 79, 255, 0.3);
		transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}

	.answer-wrapper:hover:not(.disabled) .answer-letter {
		transform: scale(1.1) rotate(-5deg);
		box-shadow: 0 6px 20px rgba(155, 79, 255, 0.5);
	}

	.answer-wrapper.correct:hover:not(.disabled) .answer-letter {
		transform: scale(1.1) rotate(-5deg);
		box-shadow: 0 6px 20px rgba(37, 183, 105, 0.5);
	}

	.answer-wrapper.incorrect:hover:not(.disabled) .answer-letter {
		transform: scale(1.1) rotate(-5deg);
		box-shadow: 0 6px 20px rgba(255, 102, 102, 0.5);
	}

	.answer-wrapper.correct .answer-letter {
		background: linear-gradient(135deg, #25b769, #1fa057);
		box-shadow: 0 4px 20px rgba(37, 183, 105, 0.5);
	}

	.answer-wrapper.incorrect .answer-letter {
		background: linear-gradient(135deg, #ff6666, #e64d4d);
		box-shadow: 0 4px 20px rgba(255, 102, 102, 0.5);
	}

	/* Текст */
	.answer-text {
		flex: 1;
		color: var(--color-text-primary, #ffffff);
		font-size: 16px;
		font-weight: 500;
		line-height: 1.5;
		user-select: none;
	}

	/* Иконка результата */
	.result-icon {
		font-size: 32px;
		animation: scaleIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}

	/* Анимации */
	@keyframes correctPulse {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
		100% {
			transform: scale(1);
		}
	}

	@keyframes incorrectShake {
		0%,
		100% {
			transform: translateX(0);
		}
		10%,
		30%,
		50%,
		70%,
		90% {
			transform: translateX(-10px);
		}
		20%,
		40%,
		60%,
		80% {
			transform: translateX(10px);
		}
	}

	@keyframes scaleIn {
		0% {
			transform: scale(0) rotate(0deg);
			opacity: 0;
		}
		50% {
			transform: scale(1.3) rotate(180deg);
		}
		100% {
			transform: scale(1) rotate(360deg);
			opacity: 1;
		}
	}
`
