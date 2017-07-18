import React from "react";
import CheckList from "./checkList";
import marked from 'marked';

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
					<span dangerouslySetInnerHTML={{__html:marked(this.props.description)}} />
					<CheckList cardId={this.props.id} tasks={this.props.tasks} />
				</div>
			);
		}

		let sideColor: React.CSSProperties = {
			position: "absolute",
			zIndex: -1,
			top: 0,
			botom: 0,
			left: 0,
			width: 7,
			height: "100%",
			backgroundColor: this.props.color
		}

		return (
			<div className="card">
				<div style={ sideColor } />
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
