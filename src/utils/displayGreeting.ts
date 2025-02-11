/**
 * Returns a greeting based on the current time.
 * @returns {string} The appropriate greeting.
 */
export const displayGreeting = (): string => {
	const currentTime = new Date()
	const currentHour = currentTime.getHours()
	let greeting: string
	if (currentHour < 12 && currentHour >= 5) {
		greeting = 'Доброе утро,'
	} else if (currentHour < 18 && currentHour > 12) {
		greeting = 'Добрый день,'
	} else {
		greeting = 'Добрый вечер,'
	}

	return greeting
}
