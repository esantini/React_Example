import PropTypes from "prop-types";
import React from "react";

import List from "./list";

class Board extends React.Component {

	public static propTypes = {
		cards: PropTypes.arrayOf(PropTypes.object),
		taskCallbacks: PropTypes.object,
	};

	public props: {
		cards: kanban.Card[],
		taskCallbacks: kanban.TaskCallbacks,
	};

	public render() {
		if (!this.props.cards) {
			console.warn("'wtf'");
		}

		return (
			<div className="kanban" style={{ border: "1px solid black", backgroundColor: "#eee", margin: "10px" }}>
				<List id="todo" title="To Do"
						taskCallbacks={ this.props.taskCallbacks }
						cards = {
							this.props.cards.filter( (card: kanban.Card) => card.status === "todo" )
						} />
				<List id="in-progress" title="In Progress"
						taskCallbacks={ this.props.taskCallbacks }
						cards = {
							this.props.cards.filter( (card: kanban.Card) => card.status === "in-progress" )
						} />
				<List id="done" title="Done"
						taskCallbacks={ this.props.taskCallbacks }
						cards = {
							this.props.cards.filter( (card: kanban.Card) => card.status === "done" )
						} />
			</div>
		);
	}

}

export default Board;
