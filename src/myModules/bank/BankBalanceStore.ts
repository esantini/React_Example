import { Store } from "flux/utils";

import AppDispatcher from "../../AppDispatcher";
import constants from "./constants";

let balance = 0;

interface IAction {
	type: string;
	ammount: number;
}

class BankBalanceStore extends Store<{}> {

	public getState() {
		return balance;
	}

	// dispatchToken: AppDispatcher.register((action: IAction) => {
	protected __onDispatch(action: IAction) {
		switch (action.type) {
			case constants.CREATED_ACCOUNT:
				balance = 0;
				this.__emitChange();
				break;
			case constants.DEPOSITED_INTO_ACCOUNT:
				// TODO: Why is action.ammount NaN when I input nothing or a string?
				if (Number.isNaN(action.ammount) ) { throw Error("Ammount is required"); }
				balance = balance + action.ammount;
				this.__emitChange();
				break;
			case constants.WITHDREW_FROM_ACCOUNT:
				// TODO: Why is action.ammount NaN when I input nothing or a string?
				if (Number.isNaN(action.ammount) ) { throw Error("Ammount is required"); }
				balance = balance - action.ammount!;
				this.__emitChange();
				break;
		}
	}

}

export default new BankBalanceStore(AppDispatcher);
