import PropTypes from "prop-types";
import React from "react";

import List from "./list";

class Board extends React.Component {

	public static propTypes = {
		cards: PropTypes.arrayOf(PropTypes.object),
	};

	public props: {
		cards: kanban.Card[],
	};

	public render() {
		return (
			<div className="kanban" style={{ border: "1px solid black", backgroundColor: "#eee", margin: "10px" }}>
				<List id="todo" title="To Do" cards = {
						this.props.cards.filter( (card: kanban.Card) => card.status === "todo" )
					} />
				<List id="in-progress" title="In Progress" cards = {
						this.props.cards.filter( (card: kanban.Card) => card.status === "in-progress" )
					} />
				<List id="done" title="Done" cards = {
						this.props.cards.filter( (card: kanban.Card) => card.status === "done" )
					} />
			</div>
		);
	}

}

export default Board;
