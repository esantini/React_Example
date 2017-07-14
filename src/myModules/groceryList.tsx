import React, { Component } from "react";

import ListItem from "./listItem";

// Passing down data from parent's to children with attributes and children

// Parent Component
class GroceryList extends Component {
	public render() {
		return (
			<ul style={{ listStylePosition: "inside" }} >
				<ListItem quantity="1">Bread</ListItem>
				<ListItem quantity="6">Eggs </ListItem>
				<ListItem quantity="2">Milk </ListItem>
			</ul>
		);
	}
}

export default GroceryList;
