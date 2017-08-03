import PropTypes from "prop-types";
import React from "react";

import * as ReactDnD from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import List from "./list";

class Board extends React.Component<kanban.Board, {}> {

	public static propTypes = {
		cards: PropTypes.arrayOf(PropTypes.object),
		taskCallbacks: PropTypes.object,
	};

	public render() {
		if (!this.props.cards) {
			console.warn("'wtf'");
		}

		return (
			<div className="kanban" style={{ border: "1px solid black", backgroundColor: "#eee", margin: "10px" }}>
				<List id="todo" title="To Do"
						taskCallbacks={ this.props.taskCallbacks }
						cardCallbacks={ this.props.cardCallbacks }
						cards = { this.props.cards.filter( (c: kanban.Card) => c.status === "todo" ) } />
				<List id="in-progress" title="In Progress"
						taskCallbacks={ this.props.taskCallbacks }
						cardCallbacks={ this.props.cardCallbacks }
						cards = {
							this.props.cards.filter( (c: kanban.Card) => c.status === "in-progress" )
						} />
				<List id="done" title="Done"
						taskCallbacks={ this.props.taskCallbacks }
						cardCallbacks={ this.props.cardCallbacks }
						cards = {
							this.props.cards.filter( (c: kanban.Card) => c.status === "done" )
						} />
			</div>
		);
	}

}

import { ContextComponentClass } from "react-dnd";
export default ReactDnD.DragDropContext(HTML5Backend)(Board) as ContextComponentClass<kanban.Board>;
