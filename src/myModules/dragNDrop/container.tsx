import React from "react";

import * as ReactDnD from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import ShoppingCart from "./shoppingCart";
import Snack from "./snack";

class Container extends React.Component {
	public render() {
		return (
			<div className="dragNDrop" >
				<Snack name = "Chips" />
				<Snack name = "Cupcake" />
				<Snack name = "Donut" />
				<Snack name = "Doritos" />
				<Snack name = "Popcorn" />
				<ShoppingCart />
			</div>
		);
	}
}

export default ReactDnD.DragDropContext(HTML5Backend)(Container);
