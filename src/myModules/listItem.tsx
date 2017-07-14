import React, { Component } from "react";

// Child Component
class ListItem extends Component {

	public props: {
		quantity: string,
		children: any,
	};

	public render() {
		return(
			<li>
				{ this.props.quantity } x { this.props.children }
			</li>
		);
	}

}

export default ListItem;
