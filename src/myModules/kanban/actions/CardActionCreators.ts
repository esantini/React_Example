import AppDispatcher from "../../../AppDispatcher";
import constants from "../constants";
import KanbanAPI from "../api/KanbanApi";

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

const CardActionCreator = {
	fetchCards() {

		AppDispatcher.dispatchAsync(KanbanAPI.fetchCards(), {
			request: constants.FETCH_CARDS,
			success: constants.FETCH_CARDS_SUCCESS,
			failure: constants.FETCH_CARDS_ERROR,
		});

		fetch(API_URL + "/cards", { headers: API_HEADERS })
			.then((response) => response.json())
			.then((responseData) => {
				try{
					// this.setState({ cards: responseData });
				} catch (e) {
					console.error(e);
				}
			})
			.catch((error) => {
				console.log("Error fetching and parsing data", error);
			});
	},
};

export default CardActionCreator;
