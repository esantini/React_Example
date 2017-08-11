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

};

export default KanbanAPI;
