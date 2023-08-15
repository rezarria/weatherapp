export const when = (v: number | undefined) => {
	const time = Math.floor(Date.now() / 1000)
	if (v == null) {
		return '??'
	}
	let diff = time - v
	const text = (diff / 60 / 60).toFixed(0)
	return diff < 0 ? `in ${text}h` : `${text}h ago`
}

export const convertToTime = (time: number | undefined) => {
	if (time == null) {
		return '???'
	}
	const dateTime = new Date(time * 1000)
	return `${dateTime.getHours() % 12}:${dateTime.getMinutes()} ${
		dateTime.getHours() > 12 ? 'PM' : 'AM'
	}`
}
