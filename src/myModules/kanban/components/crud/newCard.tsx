import PropTypes from "prop-types";
import React from "react";

import CardForm from "./cardForm";

interface IProps {
	cardCallbacks: {
		addCard( card: kanban.Card ): void;
	};
	history: History;
}

class NewCard extends React.Component<IProps, kanban.Card> {

	constructor() {
		super(...arguments);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	// tslint:disable:member-ordering
	public static propTypes = {
		cardCallbacks: PropTypes.object,
	};

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
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					handleClose={this.handleClose} />
		);
	}

	protected handleChange(field: string, value: any) {
		this.setState( { [field]: value } as any );
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
