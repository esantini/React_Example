import PropTypes from "prop-types";
import React from "react";

import CardForm from "./cardForm";

class NewCard extends React.Component {

	public static propTypes = {
		cardCallbacks: PropTypes.object,
	};

	public props: {
		cardCallbacks: {
			addCard( card: kanban.Card ): void,
		},
		history: History,
	};

	public state: kanban.Card;

	public componentWillMount() {
		this.setState({
			id: Date.now(),
			title: "",
			description: "",
			status: "todo",
			color: "#c9c9c9",
			tasks: [],
		});
	}

	public render() {
		return (
			<CardForm draftCard={this.state}
					buttonLabel="Crate Card"
					handleChange={this.handleChange.bind(this)}
					handleSubmit={this.handleSubmit.bind(this)}
					handleClose={this.handleClose.bind(this)} />
		);
	}

	protected handleChange(field: string, value: any) {
		this.setState({[field]: value } );
	}

	protected handleSubmit(e: Event) {
		e.preventDefault();
		this.props.cardCallbacks.addCard(this.state);
		this.props.history.pushState(null, "/");
	}

	protected handleClose(e: Event) {
		this.props.history.pushState(null, "/");
	}
}

export default NewCard;
