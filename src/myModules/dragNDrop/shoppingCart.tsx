import PropTypes from "prop-types";
import React from "react";
import * as ReactDnD from "react-dnd";

/**
 * ShoppingCart DND Spec
 * - DropTarget Methods (All Optional)
 *   - drop: Called when a compatible item is dropped.
 *   - hover: Called when an item is hovered over the component.
 *   - canDrop: Use it to specify whether the drop target is able to accept the item.
 */
const ShoppingCartSpec = {
	drop() {
		return { name: "ShoppingCart" };
	},
};

/**
 * ShoppingCart DropTarget - collect
 *
 *  - connect: An instance of DropTargetConnector.
 *       You use it to assign the drop target role to a DOM node.
 *
 *  - monitor: An instance of DropTargetMonitor.
 *       You use it to connect state from React DnD to props.
 *       Available functions to get state include canDrop(), isOver() and didDrop()
 */
const collect = (connect: ReactDnD.DropTargetConnector, monitor: ReactDnD.DropTargetMonitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop(),
	};
};

class ShoppingCart extends React.Component {

	public static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired,
	};

	public props: {
		canDrop: boolean,
		isOver: boolean,
		connectDropTarget: ReactDnD.ConnectDropTarget,
	};

	public render() {

		const { canDrop, isOver, connectDropTarget } = this.props;
		const isActive = canDrop && isOver;

		let bgColor: string = "#FFFFFF";
		if (isActive) { bgColor = "#F7F7BD"; }
		else if (canDrop) { bgColor = "#F7F7F7"; }

		const style = {
			backgroundColor: bgColor,
		};

		return connectDropTarget(
			<div className="shopping-cart" style={style}>
				{ isActive ?
					"Hummmm, snack!" :
					"Drag here to order."
				}
			</div>,
		);
	}
}

export default ReactDnD.DropTarget("snack", ShoppingCartSpec, collect)(ShoppingCart);
