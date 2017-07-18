import React from "react";

import Board from "./kanban/board";

import "whatwg-fetch";

// If you're running the server locally, the URL will be, by default, localhost:3000
// Also, the local server doesn't need an authorization header.
const API_URL = "http://kanbanapi.pro-react.com";
const API_HEADERS = {
	"Content-Type": "application/json",
	"Authorization": "any-string-you-like", // Auth not needed for local servers
};

class KanbanOnline extends React.Component {

	public state: {
		cards: kanban.Card[],
	};

	constructor() {
		super(...arguments);
		this.state = {
			cards: [],
		};
	}

	public componentDidMount() {
		fetch(API_URL + "/cards", { headers: API_HEADERS })
			.then((response) => response.json())
			.then((responseData) => {
				this.setState({ cards: responseData });
			})
			.catch((error) => {
				console.error("Error fetching and parsing data", error);
			});
	}

	public render() {
		return (
			<div >
				<Board cards = { this.state.cards } />
			</div>
		);
	}

}

export default KanbanOnline;
