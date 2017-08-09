import PropTypes from "prop-types";
import React, { Component } from "react";
import CardForm from "./cardForm";

interface IProps {
	cards: kanban.Card[];
	match: { params: { card_id: number }; };
	cardCallbacks: kanban.CardCallbacks;
	history: History;
}

class EditCard extends Component<IProps, kanban.Card> {

	public static propTypes = {
		cardCallbacks: PropTypes.object,
	};

	constructor() {
		super(...arguments);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	public render() {
		return (
			<CardForm draftCard={this.state}
				buttonLabel="Edit Card"
				handleChange={ this.handleChange }
				handleSubmit={ this.handleSubmit }
				handleClose={ this.handleClose } />
		);
	}

	public componentWillMount() {
		const card = this.props.cards.find((c) => c.id === this.props.match.params.card_id);
		this.setState(Object.assign({}, card) as kanban.Card);
	}

	private handleChange(field: string, value: any) {
		this.setState({ [field]: value } as kanban.Card);
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
