export function createTimeStamp(): number {
	return Math.floor(new Date().getTime() / 1000);
}
