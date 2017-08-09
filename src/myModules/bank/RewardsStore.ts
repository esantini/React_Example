import { ReduceStore } from "flux/utils";

import AppDispatcher from "../../AppDispatcher";
import BankBalanceStore from "./BankBalanceStore";
import constants from "./constants";

interface IAction {
	type: string;
}

class BankRewardsStore extends ReduceStore<string, {}> {
	public getInitialState() {
		return "Basic";
	}

	public reduce(state: string, action: IAction ) {

		this.getDispatcher().waitFor([
			BankBalanceStore.getDispatchToken(),
		]);

		if (action.type === constants.DEPOSITED_INTO_ACCOUNT ||
				action.type === constants.WITHDREW_FROM_ACCOUNT)  {
			const balance = BankBalanceStore.getState();

			if ( balance < 5000 ) { return "Basic"; }
			else if ( balance < 10000 ) { return "Silver"; }
			else if ( balance < 50000 ) { return "Gold"; }
			else { return "Platinum"; }

		}

		return state;
	}
}

export default new BankRewardsStore(AppDispatcher);
