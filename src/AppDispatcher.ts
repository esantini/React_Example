import { Dispatcher } from "flux";

class AppDispatcher extends Dispatcher<any> {

	constructor() {
		super(...arguments);
	}

	public dispatch(action = {}) {
		console.log("Dispatched", action);
		super.dispatch(action);
	}
}

export default new AppDispatcher();
