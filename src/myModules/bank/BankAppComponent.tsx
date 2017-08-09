import React from "react";

import BalanceStore from "./BankBalanceStore";
import RewardsStore from "./RewardsStore";

import Actions from "./BankActions";

import { EventSubscription } from "../../../node_modules/@types/fbemitter/index";

interface IState {
	balance: number;
	rewardsTier: string;
}

class BankApp extends React.Component<{}, IState> {

	public static getStores = () => ([BalanceStore]);

	public static calculateState = (prevState: IState) => ({
		balance: BalanceStore.getState(),
		rewardsTier: RewardsStore.getState(),
	})

	public refs: {
		[key: string]: React.ReactInstance;
		ammount: React.ReactInstance & { value: string };
	};

	private storeSubscription: EventSubscription;

	constructor() {
		super(...arguments);
		Actions.createAccount();
	}

	public render() {
		return (
			<div className="bankContainer">
				<header>FluxTrust Bank</header>
				<h1>Your balance is ${(this.state.balance).toFixed(2)}</h1>
				<h2>Your Points Rewards Tier is
					<span className="rewardTier"> {this.state.rewardsTier}</span>
				</h2>
				<div className="atm">
					<input type="text" placeholder="Enter Ammount" ref="ammount" />
					<br />
					<button onClick={ this.withdraw.bind(this) }>Withdraw</button>
					<button onClick={ this.deposit.bind(this) }>Deposit</button>
				</div>
			</div>
		);
	}

	private deposit() {
		Actions.depositIntoAccount( Number( this.refs.ammount.value ));
		this.refs.ammount.value = "";
	}

	private withdraw() {
		Actions.withdrawFromAccount( Number( this.refs.ammount.value ));
		this.refs.ammount.value = "";
	}
}

/* Note of caution (from the book): to use the Flux Util’s higher order function, the container component cannot
 * access any props. This is both for performance reasons, and to ensure that containers are reusable and that
 * props do not have to be threaded throughout a component tree
*/
import { Container } from "flux/utils";
const AppContainer = Container.create(convert(BankApp));

export default AppContainer;

/**
 * Because if I don't: Uncaught TypeError: Class constructor BankApp cannot be invoked without 'new'
 * 		at PureComponent.ContainerClass (FluxContainer.js:129)
 * Solution from: https://github.com/facebook/flux/issues/351#issuecomment-243175376
 */
function convert(containerClass: any) {
	const tmp = containerClass;
	containerClass = (...args: any[]) => {
		return new tmp(...args);
	};
	containerClass.getStores = tmp.getStores;
	containerClass.prototype = tmp.prototype;
	containerClass.calculateState = tmp.calculateState;
	return containerClass;
}
