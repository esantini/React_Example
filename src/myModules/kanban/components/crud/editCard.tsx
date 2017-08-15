import PropTypes from "prop-types";
import React, { Component } from "react";
import { Container } from "flux/utils";

import CardForm from "./cardForm";
import CardStore from "../../stores/CardStore";
import CardActionCreators from "../../actions/CardActionCreators";

import DraftStore from "../../stores/DraftStore";

interface IProps {
	history: History;
	params: { card_id: number };
}

class EditCard extends Component<IProps, { draft: kanban.Card }> {

	public static propTypes = {
		cardCallbacks: PropTypes.object,
	};

	public static getStores = () => ([DraftStore]);
	public static calculateState = (prevState: { draft: kanban.Card }) => ({
		draft: DraftStore.getState(),
	})

	constructor() {
		super(...arguments);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	public render() {
		return (
			<CardForm draftCard={ this.state.draft }
				buttonLabel="Edit Card"
				handleChange={ this.handleChange }
				handleSubmit={ this.handleSubmit }
				handleClose={ this.handleClose } />
		);
	}

	public componentWillMount() {
		setTimeout( () => {
			CardActionCreators.createDraft( CardStore.getCard(this.props.params.card_id) );
		}, 0);
	}

	private handleChange(field: string, value: any) { // TODO set value type
		CardActionCreators.updateDraft(field, value);
	}

	private handleSubmit(e: Event) {
		e.preventDefault();

		CardActionCreators.updateCard(
			CardStore.getCard(this.props.params.card_id), this.state.draft,
		);

		this.props.history.pushState(null, "/");
	}

	private handleClose(e: Event) {
		this.props.history.pushState(null, "/");
	}
}

import { convert } from "../../../utils";
export default Container.create( convert(EditCard) );
