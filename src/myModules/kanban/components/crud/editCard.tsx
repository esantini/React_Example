import PropTypes from "prop-types";
import React, { Component } from "react";

import CardForm from "./cardForm";
import CardStore from "../../stores/CardStore";
import CardActionCreators from "../../actions/CardActionCreators";

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
		// tslint:disable:radix
		const card = CardStore.getCard(parseInt((this.props as any).params.card_id));
		this.setState(Object.assign({}, card) as kanban.Card);
	}

	private handleChange(field: string, value: any) {
		this.setState({ [field]: value } as kanban.Card);
	}

	private handleSubmit(e: Event) {
		e.preventDefault();

		CardActionCreators.updateCard(
			CardStore.getCard(
				parseInt( (this.props as any).params.card_id ) ),
			this.state);
		this.props.history.pushState(null, "/");
	}

	private handleClose(e: Event) {
		this.props.history.pushState(null, "/");
	}
}

export default EditCard;
