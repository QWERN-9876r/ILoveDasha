import { createStore } from 'zustand/vanilla'
import { devtools, persist } from 'zustand/middleware'

interface User {
	id: string
	name: string
	email: string
}

interface UserState {
	user: User | null
	isLoading: boolean
}

interface UserActions {
	setUser: (user: User) => void
	clearUser: () => void
	updateUser: (updates: Partial<User>) => void
}

export type UserStore = UserState & UserActions

export const userStore = createStore<UserStore>()(
	devtools(
		persist(
			set => ({
				user: null,
				isLoading: false,
				setUser: user => set({ user }),
				clearUser: () => set({ user: null }),
				updateUser: updates =>
					set(state => ({
						user: state.user ? { ...state.user, ...updates } : null,
					})),
			}),
			{
				name: 'user-storage',
			}
		)
	)
)
