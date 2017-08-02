import { EventEmitter } from "fbemitter";
import AppDispatcher from "../../AppDispatcher";
import constants from "./constants";

const CHANGE_EVENT = "change";
const emitter = new EventEmitter();
let balance = 0;

interface IAction {
	type: string;
	ammount?: number;
}

const BankBalanceStore = {

	getState() {
		return balance;
	},

	addListener: (callback: (data?: any) => void) => {
		return emitter.addListener(CHANGE_EVENT, callback);
	},

	dispatchToken: AppDispatcher.register((action: IAction) => {
		switch (action.type) {
			case constants.CREATED_ACCOUNT:
				balance = 0;
				emitter.emit(CHANGE_EVENT);
				break;
			case constants.DEPOSITED_INTO_ACCOUNT:
				balance = balance + action.ammount!;
				emitter.emit(CHANGE_EVENT);
				break;
			case constants.WITHDREW_FROM_ACCOUNT:
				balance = balance - action.ammount!;
				emitter.emit(CHANGE_EVENT);
				break;
		}
	}),

};

export default BankBalanceStore;
