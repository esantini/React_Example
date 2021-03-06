import marked from "marked";
import PropTypes from "prop-types";
import React from "react";
import { DragSource, DropTarget } from "react-dnd";

import ReactTransitionGroup from "react-transition-group";

import constants from "../constants";
import CheckList from "./checkList";

import { Link } from "react-router-dom";
import CardActionCreators from "../actions/CardActionCreators";

/**
 * This is why prop-types are useful even if you already have typescript or flow.
 */
const titlePropType = (props: { [key: string]: string }, propName: string, componentName: string) => {
	if (props[propName]) {
		const value = props[propName];
		if (typeof value !== "string") {
			return new Error(
				`${propName} in ${componentName} is ${typeof value} when it should be a string`,
			);
		}
		if (value.length > 50) {
			console.warn( `${propName} "${value}" in ${componentName} is longer than 50 characters` );
		}
	}
};

const cardDragSpec = {
	beginDrag(props: kanban.Card) {
		return {
			id: props.id,
			status: props.status,
		};
	},
	endDrag(props: kanban.Card) {
		CardActionCreators.persistCardDrag(props);
	},
};

const collectDrag = (connect: any, monitor: any) => {
	return {
		connectDragSource: connect.dragSource(),
	};
};

const cardDropSpec = {
	hover(props: kanban.Card, monitor: __ReactDnd.DropTargetMonitor) {
		const draggedId = (monitor.getItem() as kanban.Card).id;
		if (props.id !== draggedId){
			CardActionCreators.UpdateCardPosition(draggedId, props.id);
		}
	},
};

const collectDrop = (connect: __ReactDnd.DropTargetConnector, monitor: __ReactDnd.DropTargetMonitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
	};
};

class Card extends React.Component<kanban.Card, { showDetails: boolean }> {

	public static propTypes = {
		id: PropTypes.number,
		title: titlePropType,
		description: PropTypes.string,
		color: PropTypes.string,
		tasks: PropTypes.array,
		status: PropTypes.string,
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
	};

	public render() {
		const { isDragging, connectDragSource, connectDropTarget } = this.props;

		let cardDetails;
		if (this.props.showDetails !== false ) {
			cardDetails = (
				<div className="card__details">
					<span dangerouslySetInnerHTML={{__html: marked(this.props.description)}} />
					<CheckList
						cardId = {this.props.id}
						tasks = {this.props.tasks}
						taskCallbacks = {this.props.taskCallbacks} />
				</div>
			);
		}

		const sideColor: React.CSSProperties = {
			position: "absolute",
			zIndex: -1,
			top: 0,
			botom: 0,
			left: 0,
			width: 7,
			height: "100%",
			backgroundColor: this.props.color,
		};

		return connectDropTarget(connectDragSource(
			<div className="card">
				<div style={ sideColor } />
				<div className="card__edit"><Link to={"/kanban/edit/" + this.props.id}>✎</Link></div>
				<div className={ this.props.showDetails ? "card__title card__title--is-open" : "card__title"}
						onClick={ this.toggleDetails.bind(this) }>
					{this.props.title}
				</div>
				<ReactTransitionGroup.TransitionGroup>
					<ReactTransitionGroup.CSSTransition
							key={this.props.id}
							classNames="toggle"
							timeout={{ enter: 300, exit: 300 }}>

						<div>{ cardDetails }</div>
					</ReactTransitionGroup.CSSTransition>
				</ReactTransitionGroup.TransitionGroup>
			</div>,
		));
	}

	public toggleDetails() {
		CardActionCreators.toggleCardDetails(this.props.id);
	}
}

const dragHighOrderCard = DragSource(constants.CARD, cardDragSpec, collectDrag)(Card as any);
const dragDropHighOrderCard = DropTarget(constants.CARD, cardDropSpec, collectDrop)(dragHighOrderCard);
export default dragDropHighOrderCard;
