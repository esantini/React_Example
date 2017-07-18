import PropTypes from "prop-types";
import React from "react";

import Card from "./card";

class List extends React.Component {

	public static propTypes = {
		title: PropTypes.string.isRequired,
		cards: PropTypes.arrayOf(PropTypes.object),
	};

	public props: kanban.List;

	public render() {
		const cards = this.props.cards.map(
			(card) => {
				return (
					<Card id={ card.id }
						key={ card.id }
						title={ card.title }
						description = {card.description }
						color={card.color}
						tasks={ card.tasks } />
					);
			});

		return (
			<div className="list">
				<h1>{ this.props.title }</h1>
				{ cards }
			</div>
		);
	}
}

export default List;
