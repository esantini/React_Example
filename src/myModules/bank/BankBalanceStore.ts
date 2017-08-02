import { ReduceStore } from "flux/utils";

import AppDispatcher from "../../AppDispatcher";
import constants from "./constants";

interface IAction {
	type: string;
	ammount: number;
}

class BankBalanceStore extends ReduceStore<number, IAction> {

	public getInitialState() {
		return 0;
	}

	public reduce(state: number, action: IAction) {

		switch (action.type) {

			case constants.CREATED_ACCOUNT:
				return 0;

			case constants.DEPOSITED_INTO_ACCOUNT:
				// TODO: Why is action.ammount NaN when I input a string?
				if (Number.isNaN(action.ammount) ) { throw Error("Ammount is required"); }
				return state + action.ammount;

			case constants.WITHDREW_FROM_ACCOUNT:
				// TODO: Why is action.ammount NaN when I input a string?
				if (Number.isNaN(action.ammount) ) { throw Error("Ammount is required"); }
				return state - action.ammount;

		}

		return state;
	}

}

export default new BankBalanceStore(AppDispatcher);
