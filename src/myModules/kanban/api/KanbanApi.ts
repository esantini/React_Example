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

const KanbanAPI = {

	fetchCards() {
		return fetch(`${API_URL}/cards`, {headers: API_HEADERS } )
				.then((response: any) => response.json() );
	},

	addCard(card: kanban.Card) {
		return fetch(`${API_URL}/cards`, {
			method: "post",
			headers: API_HEADERS,
			body: JSON.stringify(card),
		})
		.then( (response: Response) => response.json() );
	},

	updateCard( card: kanban.Card, draftCard: kanban.Card ) {
		return fetch(`${API_URL}/cards/${card.id}`, {
			method: "put",
			headers: API_HEADERS,
			body: JSON.stringify(draftCard),
		});
	},

	persistCardDrag(cardId: number, status: string, index: number) {
		return fetch(`${API_URL}/cards/${cardId}`, {
			method: "put",
			headers: API_HEADERS,
			body: JSON.stringify({ status, row_order_position: index } ),
		});
	},

	addTask( cardId: number, task: kanban.Task ) {
		return fetch( `${API_URL}/cards/${cardId}/tasks`, {
			method: "post",
			headers: API_HEADERS,
			body: JSON.stringify(task),
		})
		.then((response: Response) => response.json());
	},

	deleteTask( cardId: number, task: kanban.Task) {
		return fetch(`${API_URL}/cards/${cardId}/tasks/${task.id}`, {
			method: "delete",
			headers: API_HEADERS,
		});
	},

	toggleTask(cardId: number, task: kanban.Task ) {
		return fetch(`${API_URL}/cards/${cardId}/tasks/${task.id}`, {
			method: "put",
			headers: API_HEADERS,
			body: JSON.stringify({done: !task.done } ),
		});
	},

};

export default KanbanAPI;
