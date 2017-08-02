import AppDispatcher from "../../AppDispatcher";
import constants from "./constants";

const BankActions = {
	/**
	 * Create an account with an empty value
	 */
	createAccount() {
		AppDispatcher.dispatch({
			type: constants.CREATED_ACCOUNT,
			ammount: 0,
		});
	},

	/**
	 * Deposit into account
	 * @param ammount {number} ammount to deposit
	 */
	depositIntoAccount(ammount: number) {
		AppDispatcher.dispatch({
			type: constants.DEPOSITED_INTO_ACCOUNT,
			ammount,
		});
	},

	/**
	 * Withdraw from account
	 * @param ammount {number} ammount to withdraw
	 */
	withdrawFromAccount(ammount: number) {
		AppDispatcher.dispatch({
			type: constants.WITHDREW_FROM_ACCOUNT,
			ammount,
		});
	},
};

export default BankActions;
