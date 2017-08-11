import update from "immutability-helper";
import PropTypes from "prop-types";
import React from "react";
import { Route } from "react-router-dom";
import { Container } from "flux/utils";

import Board from "./components/board";
import EditCard from "./components/crud/editCard";
import NewCard from "./components/crud/newCard";

import CardActionCreators from "./actions/CardActionCreators";
import CardStore from "./stores/CardStore";

import { throttle } from "../utils";

const API_URL = "http://kanbanapi.pro-react.com";
const API_HEADERS = {
	"Content-Type": "application/json",
	/*
	 * Change the Authorization to any string you like. It can be your pet's name,
	 * your middle name, your favorite animal, your superpower of choice...
	 * An unique authorization will allow you to have your own environment for cards and tasks
	 */
	"Authorization": "eSantiniWebDevelopment",
};

interface IKanban {
	cards: kanban.Card[];
	match: { url: string };
}

class Kanban extends React.Component
		<IKanban, { cards: kanban.Card[] }> {

	public static propTypes = {
		cards: PropTypes.arrayOf(PropTypes.object),
		taskCallbacks: PropTypes.object,
		cardCallbacks: PropTypes.object,
	};

	public static getStores = () => ([CardStore]);
	public static calculateState = (prevState: IKanban) => ({ cards: CardStore.getState() });

	constructor() {
		super(...arguments);
		this.state = {
			cards: [],
		};

		/* Card Callbacks */
		this.addCard = this.addCard.bind(this);
		this.updateCard = this.updateCard.bind(this);
		this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
		this.updateCardPosition = throttle(this.updateCardPosition.bind(this), 500);
		this.persistCardDrag = this.persistCardDrag.bind(this);

		/* Task Callbacks */
		this.toggleTask = this.toggleTask.bind(this);
		this.deleteTask = this.deleteTask.bind(this);
		this.addTask = this.addTask.bind(this);
	}

	public render() {

		const cardCallbacks =
				{
					addCard: this.addCard,
					updateCard: this.updateCard,
					updateStatus: this.updateCardStatus,
					updatePosition: this.updateCardPosition,
					persistCardDrag: this.persistCardDrag,
				};

		const kanbanBoard =
		<Board
			cards= {this.state.cards}
			taskCallbacks= {
				{
					toggle: this.toggleTask,
					delete: this.deleteTask,
					add: this.addTask,
				}
			}
			cardCallbacks= { cardCallbacks } />;

		const myEdit = (props: any) => {
			return <EditCard cards={ this.state.cards } {...props} />;
		};
		const myNewCard = (props: any) => {
			return <EditCard cards={ this.state.cards } {...props} />;
		};

		return (
			<div>
				{ kanbanBoard }
				<Route path={this.props.match.url + "/edit/:card_id"} render={myEdit} />
				<Route path={this.props.match.url + "/new"} render={myNewCard} />
			</div>);

	}

	public componentDidMount() {
		CardActionCreators.fetchCards();
	}

	/**
	 * Receives a card Id and a task name; creates a new task for a given card. In the
	 * refactor, you will pass an entire Task object instead of just the task name.
	 */
	private addTask(cardId: number, taskName: string) {

		// Keep a reference to the original state prior to the mutations
		// in case we need to revert the optimistic changes in the UI
		const prevState = this.state;

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

		fetch(`${API_URL}/cards/${cardId}/tasks`, {
			method: "post",
			headers: API_HEADERS,
			body: JSON.stringify(newTask),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					// Throw an error if server response wasn't "OK"
					// so we can revert back the optimistic changes
					// made to the UI.
					throw new Error("Server response wasn't OK");
				}
			})
			.then((responseData) => {
				// When the server returns the definitive ID
				// used for the new Task on the server, update it on React
				newTask.id = responseData.id;
				this.setState({ cards: nextState });
			})
			.catch((error: Error) => {
				this.setState(prevState);
			});
	}

	/**
	 * Receives a card Id, a task id, and the task index; deletes the task. In the refactor,
	 * you pass the entire card object instead of just the id.
	 */
	private deleteTask(cardId: number, taskId: number, taskIndex: number) {

		// Keep a reference to the original state prior to the mutations
		// in case we need to revert the optimistic changes in the UI
		const prevState = this.state;

		// Find the index of the card
		const cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

		// Create a new object without the task
		const nextState = update(this.state.cards, {
			[cardIndex]: {
				tasks: { $splice: [[taskIndex, 1]] },
			},
		});

		// set the component state to the mutated object
		this.setState({ cards: nextState });

		// Call the API to remove the task on the server
		fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
			method: "delete",
			headers: API_HEADERS,
		})
			.then((response) => {
				if (!response.ok) {
					// Throw an error if server response wasn't 'ok'
					// so we can revert back the optimistic changes
					// made to the UI.
					throw new Error("Server response wasn't OK");
				}
			})
			.catch((error: Error) => {
				console.error("Fetch error:", error);
				this.setState(prevState);
			});
	}

	/**
	 * Receives a card Id and a task name; creates a new task for a given card. In the
	 * refactor, you will pass an entire Task object instead of just the task name.
	 */
	private toggleTask(cardId: number, taskId: number, taskIndex: number) {

		const prevState = this.state;

		// Find the index of the card
		const cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

		// Save a reference to the task's 'done' value
		let newDoneValue;

		// Using the $apply command, you will change the done value to its opposite
		const nextState = update(this.state.cards, {
			[cardIndex]: {
				tasks: {
					[taskIndex]: {
						done: {
							$apply: (done: boolean) => {
								newDoneValue = !done;
								return newDoneValue;
							},
						},
					},
				},
			},
		});

		// set the component state to the mutated object
		this.setState({ cards: nextState });

		// Call the API to toggle the task on the server
		fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
			method: "put",
			headers: API_HEADERS,
			body: JSON.stringify({ done: newDoneValue }),
		})
			.then((response) => {
				if (!response.ok) {
					// Throw an error if server response wasn't 'ok'
					// so we can revert back the optimistic changes
					// made to the UI.
					throw new Error("Server response wasn't OK");
				}
			})
			.catch((error) => {
				console.error("Fetch error:", error);
				this.setState(prevState);
			});
	}

	/**
	 * Receives the current card Id and the new status Id. Called during the card dragand-drop.
	 * Updates the card status.
	 */
	private updateCardStatus(cardId: number, listId: string) {

		// Find the index of the card
		const cardIndex = this.state.cards.findIndex((c) => c.id === cardId);

		// Get the current card
		const card = this.state.cards[cardIndex];

		// Only proceed if hovering over a different list
		if (card.status !== listId) {
			// set the component state to the mutated object
			this.setState(update(this.state, {
				cards: {
					[cardIndex]: {
						status: { $set: listId },
					},
				},
			}));
		}

	}

	/**
	 * Receives the current card id and the card id with which the current card will
	 * switch positions. Called during the card drag-and-drop. Switches the positions
	 * of the given cards.
	 */
	private updateCardPosition(cardId: number, afterId: number) {

		// Only proceed if hovering over a different card
		if (cardId !== afterId) {
			// Find the index of the card
			const cardIndex = this.state.cards.findIndex((c) => c.id === cardId);

			// Get the current card
			const card = this.state.cards[cardIndex];

			// Find the index of the card the user is hovering over
			const afterIndex = this.state.cards.findIndex((cardFound) => cardFound.id === afterId);

			// Use splice to remove the card and reinsert it at the new index
			this.setState(update(this.state, {
				cards: {
					$splice: [
						[cardIndex, 1],
						[afterIndex, 0, card],
					],
				},
			}));
		}

	}

	/**
	 * Receives an object containing a given card’s ID and the new card status. Called
	 * after a card’s drag-and-drop. Persists the new card’s position and status on the
	 * server
	 */
	private persistCardDrag(cardId: number, status: string) {
		// Find the index of the card
		const cardIndex = this.state.cards.findIndex((c) => c.id === cardId);
		// Get the current card
		const card = this.state.cards[cardIndex];

		fetch(`${API_URL}/cards/${cardId}`, {
			method: "put",
			headers: API_HEADERS,
			body: JSON.stringify({ status: card.status, row_order_position: cardIndex }),
		})
			.then((response) => {
				if (!response.ok) {
					// if it ain't ok
					throw new Error("Server reponse wasn't OK");
				}
			})
			.catch((error) => {
				console.error("Fetch error:", error);
				this.setState(
					update(this.state, {
						cards: {
							[cardIndex]: {
								status: { $set: status },
							},
						},
					}),
				);
			});
	}

	/** Receives an object with card properties as parameters; creates a new card. */
	private addCard(card: kanban.Card) {
		// Keep a reference to the original state prior to the mutations
		// in case we need to revert the optimistic changes in the UI
		const prevState = this.state;

		// Add a temporary ID to the card
		if (card.id === null) {
			card = Object.assign({}, card, { id: Date.now() });
		}

		// Create a new object and push the new card to the array of cards
		const nextState = update(this.state.cards, { $push: [card] });

		// set the component state to the mutated object
		this.setState({ cards: nextState });

		// Call the API to add the card on the server
		fetch(`${API_URL}/cards`, {
			method: "post",
			headers: API_HEADERS,
			body: JSON.stringify(card),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					// Throw an error if server response wasn't 'ok'
					// so we can revert back the optimistic changes
					// made to the UI.
					throw new Error("Server response wasn't OK");
				}
			})
			.then((responseData) => {
				// When the server returns the definitive ID
				// used for the new Card on the server, update it on React
				card.id = responseData.id;
				this.setState({ cards: nextState });
			})
			.catch((error) => {
				this.setState(prevState);
			});
	}

	/**
	 * Receives an object with the updated card properties; updates the properties
	 * of the given card. In the refactor, it receives two properties: the original card
	 * properties and the changed card properties.
	 */
	private updateCard(card: kanban.Card) {
		// Keep a reference to the original state prior to the mutations
		// in case we need to revert the optimistic changes in the UI
		const prevState = this.state;

		// Find the index of the card
		const cardIndex = this.state.cards.findIndex((c) => c.id === card.id);

		// Using the $set command, we will change the whole card
		const nextState = update(
			this.state.cards, {
				[cardIndex]: { $set: card },
			},
		);

		// Set the component state to the mutated object.
		this.setState({ cards: nextState });

		fetch(`${API_URL}/cards/${card.id}`, {
			method: "put",
			headers: API_HEADERS,
			body: JSON.stringify(card),
		})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Server response wasn't OK");
			}
		})
		.catch((error) => {
			console.error("Fetch error:", error);
			this.setState(prevState);
		});
	}
}

import { convert } from "../utils";
export default Container.create( convert(Kanban) );
