import React from "react";

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

// For the Drag and Drop:
import { getHTML5Context } from "../utils";
export default getHTML5Context()(Container) as __ReactDnd.ContextComponentClass<kanban.Board>;
