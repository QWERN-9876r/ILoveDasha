export const wait: (t: number) => Promise<void> = (t: number) =>
	new Promise(res => setTimeout(res, t))
