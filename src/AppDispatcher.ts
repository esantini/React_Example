import { Dispatcher } from "flux";

class AppDispatcher extends Dispatcher<any> {

	constructor() {
		super(...arguments);
	}

	public dispatch(action = {}) {
		console.log("Dispatched", action);
		super.dispatch(action);
	}

	/**
	 * Dispatches three actions for an async operation represented by promise.
	 */
	public dispatchAsync(promise: any, types: any, payload?: any) {
		console.log("Async Dispatch:", arguments);

		const { request, success, failure } = types;
		this.dispatch({ type: request, payload: Object.assign({}, payload) });
		promise.then(
			(response: any) => this.dispatch({
				type: success,
				payload: Object.assign({}, payload, { response }),
			}),
			(error: any) => this.dispatch({
				type: failure,
				payload: Object.assign({}, payload, { error }),
			}),
		);
	}
}

export default new AppDispatcher();
