import update from "immutability-helper";
import PropTypes from "prop-types";
import React from "react";

import Board from "./board";

class Kanban extends React.Component {

	public static propTypes = {
		cards: PropTypes.arrayOf(PropTypes.object),
		taskCallbacks: PropTypes.object,
	};

	public props: {
		cards: kanban.Card[],
	};

	public state: {
		cards: kanban.Card[],
	};

	constructor() {
		super(...arguments);
		this.state = {
			cards: this.props.cards,
		};
	}

	public render() {
		return (
			<div >
				<Board cards = { this.state.cards }
						taskCallbacks={{
							toggle: this.toggleTask.bind(this),
							delete: this.deleteTask.bind(this),
							add: this.addTask.bind(this),
						}} />
			</div>
		);
	}

	private addTask(cardId: number, taskName: string) {
		// Find the index of the card
		const cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

		// Create a new task with the given name and a temporary ID
		const newTask = { id: Date.now(), name: taskName, done: false };

		// Create a new object and push the new task to the array of tasks
		const nextState = update(this.state.cards, {
					[cardIndex]: {
						tasks: { $push: [newTask] },
					},
				});

		// set the component state to the mutated object
		this.setState({ cards: nextState });
	}

	private deleteTask(cardId: number, taskId: number, taskIndex: number) {
		// Find the index of the card
		const cardIndex = this.state.cards.findIndex((card) => card.id === cardId );

		// Create a new object without the task
		const nextState = update(this.state.cards, {
					[cardIndex]: {
						tasks: { $splice: [[taskIndex, 1]] },
					},
				});

		// set the component state to the mutated object
		this.setState({cards: nextState });
	}

	private toggleTask(cardId: number, taskId: number, taskIndex: number) {
		// Find the index of the card
		const cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

		// Save a reference to the task's 'done' value
		let newDoneValue;

		// Using the $apply command, you will change the done value to its opposite
		const nextState = update(this.state.cards, {
					[cardIndex]: {
						tasks: {
							[taskIndex]: {
								done: { $apply: (done: boolean) => {
									newDoneValue = !done;
									return newDoneValue;
								}},
							},
						},
					},
				});

		// set the component state to the mutated object
		this.setState( { cards: nextState } );
	}
}

export default Kanban;
