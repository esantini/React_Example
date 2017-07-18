import React from "react";

import Board from "./board";

class Kanban extends React.Component {

	public props: {
		cards: kanban.Card[],
	};

	public state: {
		cards: kanban.Card[],
	};

	constructor() {
		super(...arguments);
		this.state = {
			cards: [],
		};
	}

	public componentDidMount() { }

	protected addTask(cardId: number, taskName: string) { }

	protected deleteTask(cardId: number, taskId: number, taskIndex: number) { }

	protected toggleTask(cardId: number, taskId: number, taskIndex: number) { }

	public render() {
		return (
			<div >
				<Board cards = { this.state.cards } />
			</div>	
		);
	}

}

export default Kanban;
