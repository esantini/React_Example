import React from "react";
import BankBalanceStore from "./BankBalanceStore";
import BankActions from "./BankActions";
import { EventSubscription } from "../../../node_modules/@types/fbemitter/index";

class BankApp extends React.Component<{}, { balance: number }> {

	public refs: {
		[key: string]: React.ReactInstance;
		ammount: React.ReactInstance & { value: number };
	};

	private storeSubscription: EventSubscription;

	constructor() {
		super(...arguments);
		BankActions.createAccount();
		this.state = {
			balance: BankBalanceStore.getState(),
		};
	}

	public render() {
		return (
			<div className="bankContainer">
				<header>FluxTrust Bank</header>
				<h1>Your balance is ${(this.state.balance).toFixed(2)}</h1>
				<div className="atm">
					<input type="text" placeholder="Enter Ammount" ref="ammount" />
					<br />
					<button onClick={ this.withdraw.bind(this) }>Withdraw</button>
					<button onClick={ this.deposit.bind(this) }>Deposit</button>
				</div>
			</div>
		);
	}

	public componentDidMount() {
		this.storeSubscription = BankBalanceStore.addListener(
			() => this.handleStoreChange(),
		);
	}

	public componentWillUnmount() {
		this.storeSubscription.remove();
	}

	private deposit() {
		BankActions.depositIntoAccount( Number( (this.refs.ammount as any).value ));
	}

	private withdraw() {
		BankActions.withdrawFromAccount( Number( (this.refs.ammount as any).value ));
	}

	private handleStoreChange() {
		this.setState( { balance: BankBalanceStore.getState() } );
	}
}

export default BankApp;
