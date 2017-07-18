import marked from "marked";
import PropTypes from "prop-types";
import React from "react";

import CheckList from "./checkList";

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

class Card extends React.Component {

	public static propTypes = {
		id: PropTypes.number,
		title: titlePropType,
		description: PropTypes.string,
		color: PropTypes.string,
		tasks: PropTypes.arrayOf(PropTypes.object),
	};

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
					<span dangerouslySetInnerHTML={{__html: marked(this.props.description)}} />
					<CheckList cardId={this.props.id} tasks={this.props.tasks} />
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
