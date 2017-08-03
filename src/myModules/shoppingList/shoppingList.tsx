import React from "react";
import ReactTransitionGroup from "react-transition-group";

interface Item {
	id: number;
	name: string;
}

interface IState {
	items: Item[];
	newItem?: string;
}

class ShoppingList extends React.Component<{}, IState> {

	private inputStyle: React.CSSProperties = {
		padding: "5px",
		width: "120px",
		marginTop: "10px",
	};

	private itemStyle: React.CSSProperties = {
		backgroundColor: "#efefef",
		cursor: "pointer",
		display: "block",
		margin: "0 auto 1px",
		padding: "8px 12px",
		width: "120px",
	};

	constructor() {
		super(...arguments);

		this.state = {
			items: [
				{ id: 1, name: "Milk" },
				{ id: 2, name: "Yogurt" },
				{ id: 3, name: "Orange Juice" },
			],
		};
	}

	public render() {
		const shoppingItems = this.state.items.map((item: Item, i: number) => {
			return (
				<ReactTransitionGroup.CSSTransition
						key={item.id}
						classNames="example"
						timeout={{ enter: 300, exit: 300 }} >

					<div style={this.itemStyle}
							onClick={this.handleRemove.bind(this, i)}>
						{item.name}
					</div>

				</ReactTransitionGroup.CSSTransition>
			);
		});

		return (
			<div>
				<ReactTransitionGroup.TransitionGroup>
					{shoppingItems}
				</ReactTransitionGroup.TransitionGroup>

				<input
						style={this.inputStyle}
						type="text"
						value={this.state.newItem}
						onKeyDown={ this.handleChange.bind(this) }
					/>
			</div>
		);
	}

	private handleChange(evt: IMyReactInputKeyboardEvent) {
		if (evt.key === "Enter") {

			// Create a new item and set the current time as it's id
			const newItem = { id: Date.now(), name: evt.target.value };

			// Create a new Array with the previous items plus the value the user typed
			const newItems = this.state.items.concat(newItem);

			// Clear the text field
			evt.target.value = "";

			this.setState( {items: newItems} );

		}
	}

	// Called when the user Clicks on a shopping item
	private handleRemove(i: number) {
		// Create a new array without the clicked item
		const newItems = this.state.items;
		newItems.splice(i, 1);

		// Set the new state
		this.setState({items: newItems});
	}

}

interface IMyReactInputKeyboardEvent extends React.KeyboardEvent<HTMLInputElement> {
	target: HTMLInputElement;
}

export default ShoppingList;
