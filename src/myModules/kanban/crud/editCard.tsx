import PropTypes from "prop-types";
import React, { Component } from "react";
import CardForm from "./cardForm";

interface IProps {
	cards: kanban.Card[];
	params: any;
	cardCallbacks: kanban.CardCallbacks;
	history: History;
}

class EditCard extends Component<IProps> {

	public static propTypes = {
		cardCallbacks: PropTypes.object,
	};

	public state: kanban.Card;

	public render() {
		return (
			<CardForm draftCard={this.state}
				buttonLabel="Edit Card"
				handleChange={this.handleChange.bind(this)}
				handleSubmit={this.handleSubmit.bind(this)}
				handleClose={this.handleClose.bind(this)} />
		);
	}

	public componentWillMount() {
		const card = this.props.cards.find((c) => c.id === this.props.params.card_id);
		this.setState(Object.assign({}, card));
	}

	private handleChange(field: string, value: any) {
		this.setState({ [field]: value });
	}

	private handleSubmit(e: Event) {
		e.preventDefault();

		this.props.cardCallbacks.updateCard(this.state);
		this.props.history.pushState(null, "/");
	}

	private handleClose(e: Event) {
		this.props.history.pushState(null, "/");
	}
}

export default EditCard;
