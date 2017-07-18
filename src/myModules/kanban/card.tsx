import React from "react";
import CheckList from "./checkList";

class Card extends React.Component {

	public props: kanban.Card;

	public state: {
		showDetails: boolean,
	};

	public constructor() {
		super(...arguments);
		this.state = {
			showDetails: false,
		};
	}

	public render() {

		let cardDetails;
		if (this.state.showDetails) {
			cardDetails = (
				<div className="card__details">
					{this.props.description}
					<CheckList cardId={this.props.id} tasks={this.props.tasks} />
				</div>
			);
		}

		return (
			<div className="card">
				<div className={ this.state.showDetails ? "card__title card__title--is-open" : "card__title"}
						onClick={ this.toggleDetails.bind(this) }>
					{this.props.title}
				</div>
				{ cardDetails }
			</div>
		);
	}

	private toggleDetails() {
		this.setState({ showDetails: !this.state.showDetails });
	}
}

export default Card;
