import React from "react";
import CheckList from "./checkList";

class Card extends React.Component {

	public props: kanban.Card;

	public constructor() {
		super(...arguments);
		this.state = {
			showDetail: false,
		};
	}

	public render() {
		return (
			<div className="card">
				<div className="card__title">{this.props.title}</div>
				<div className="card__details">
					{this.props.description}
					<CheckList cardId={this.props.id} tasks={this.props.tasks} />
				</div>
			</div>
		);
	}
}

export default Card;
