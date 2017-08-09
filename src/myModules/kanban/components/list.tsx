import PropTypes from "prop-types";
import React from "react";

import { DropTarget } from "react-dnd";

import Card from "./card";

const listTargetSpec = {
	hover(props: kanban.List, monitor: any ) {
		const draggedId = monitor.getItem().id;
		props.cardCallbacks.updateStatus(draggedId, props.id);
	},
};

function collect(
		connect: __ReactDnd.DropTargetConnector,
		monitor: __ReactDnd.DropTargetMonitor) {
	return {
		connectDropTarget: connect.dropTarget(),
	};
}

class List extends React.Component<kanban.List, {}> {

	public static propTypes = {
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		cards: PropTypes.arrayOf(PropTypes.object),
		taskCallbacks: PropTypes.object,
		cardCallbacks: PropTypes.object,
		connectDropTarget: PropTypes.func.isRequired,
	};

	public render() {
		const { connectDropTarget } = this.props;
		if (!connectDropTarget) { throw new Error("connectDropTarget is Required"); }
		const cards = this.props.cards.map(
			(card: kanban.Card) => {
				return (
					<Card {...card}
						key={ card.id }
						taskCallbacks={ this.props.taskCallbacks }
						cardCallbacks={ this.props.cardCallbacks } />
					);
			});

		return connectDropTarget(
			<div className="list">
				<h1>{ this.props.title }</h1>
				{ cards }
			</div>,
		);
	}
}

export default DropTarget("card", listTargetSpec, collect)(List as any);
