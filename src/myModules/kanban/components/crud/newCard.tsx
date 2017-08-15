import PropTypes from "prop-types";
import React from "react";
import { Container } from "flux/utils";

import CardForm from "./cardForm";
import DraftStore from "../../stores/DraftStore";

import CardActionCreators from "../../actions/CardActionCreators";

interface IProps {
	cardCallbacks: {
		addCard( card: kanban.Card ): void;
	};
	history: History;
}

class NewCard extends React.Component<IProps, { draft: kanban.Card }> {

	public static propTypes = {
		cardCallbacks: PropTypes.object,
	};

	public static getStores = () => ([DraftStore]);
	public static calculateState = (prevState: {draft: kanban.Card}) => ({
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
			<CardForm draftCard={this.state.draft}
					buttonLabel="Crate Card"
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					handleClose={this.handleClose} />
		);
	}

	public componentDidMount() {
		setTimeout(() => CardActionCreators.createDraft(), 0);
	}

	protected handleChange(field: string, value: any) {
		CardActionCreators.updateDraft(field, value);
	}

	protected handleSubmit(e: Event) {
		e.preventDefault();
		CardActionCreators.addCard(this.state.draft);
		this.props.history.pushState(null, "/");
	}

	protected handleClose(e: Event) {
		this.props.history.pushState(null, "/");
	}
}

import { convert } from "../../../utils";
export default Container.create( convert(NewCard) );
