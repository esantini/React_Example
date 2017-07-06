import React, { Component } from 'react';

// Passing down data from parent's to children with attributes and children

// Parent Component
class GroceryList extends Component {
	render() {
		return (
			<ul style={{ listStylePosition: "inside" }} >
				<ListItem quantity="1">Bread</ListItem>
				<ListItem quantity="6">Eggs </ListItem>
				<ListItem quantity="2">Milk </ListItem>
			</ul>
		);
	}
}

// Child Component
class ListItem extends Component {
	render() {
		return(
			<li>
				{ this.props.quantity } x { this.props.children }
			</li>
		);
	}
}

export default GroceryList;