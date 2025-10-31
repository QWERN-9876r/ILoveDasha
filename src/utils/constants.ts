import { QUESTIONS } from '../components/quiz'

export const PRELOAD_IMAGES = [...QUESTIONS.map(({ bg }) => bg), 'game-1-icon.png', 'ring.png']
export const PRELOAD_AUDIO = {
	heart: '/my_heart.mp3',
}
