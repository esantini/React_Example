
/**
 * Actions are any change made to the application's state
 */
declare interface Action {
	/**
	 * Describes the change.
	 */
	type: string,
	/**
	 * (optional) extra data needed to perform the action.
	 * Can be named anything. By convention we use payload.
	 */
	payload: any,
}

declare interface User {
	id: number,
	first: string,
	last: string,
	age: number,
	description: string,
	thumbnail: string,
}