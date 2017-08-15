import AppDispatcher from "../../../AppDispatcher";
import constants from "../constants";
import KanbanAPI from "../api/KanbanApi";
import CardStore from "../stores/CardStore";
import { throttle } from "../../../myModules/utils";

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
	},

	toggleCardDetails(cardId: number) {
		AppDispatcher.dispatch({
			type: constants.TOGGLE_CARD_DETAILS,
			payload: { cardId },
		});
	},

	addCard(card: kanban.Card) {
		AppDispatcher.dispatchAsync(KanbanAPI.addCard(card), {
			request: constants.CREATE_CARD,
			success: constants.CREATE_CARD_SUCCESS,
			failure: constants.CREATE_CARD_ERROR,
		}, {card} );
	},

	updateCard(card: kanban.Card, draftCard: kanban.Card) {
		AppDispatcher.dispatchAsync(KanbanAPI.updateCard(card, draftCard), {
			request: constants.UPDATE_CARD,
			success: constants.UPDATE_CARD_SUCCESS,
			failure: constants.UPDATE_CARD_ERROR,
		}, { card, draftCard } );
	},

	updateCardStatus: throttle((cardId: number, listId: number ) => {
		AppDispatcher.dispatch({
			type: constants.UPDATE_CARD_STATUS,
			payload: {cardId, listId},
		});
	}),

	UpdateCardPosition: throttle((cardId: number, afterId: number) => {
		AppDispatcher.dispatch({
			type: constants.UPDATE_CARD_POSITION,
			payload: { cardId, afterId },
		});
	}, 500),

	persistCardDrag(cardProps: kanban.Card) {
		const card = CardStore.getCard(cardProps.id);
		const cardIndex = CardStore.getCardIndex(cardProps.id);
		AppDispatcher.dispatchAsync(KanbanAPI.persistCardDrag(card.id, card.status, cardIndex), {
			request: constants.PERSIST_CARD_DRAG,
			success: constants.PERSIST_CARD_DRAG_SUCCESS,
			failure: constants.PERSIST_CARD_DRAG_ERROR,
		}, {cardProps});
	},

	createDraft(card?: kanban.Card) {
		AppDispatcher.dispatch({
			type: constants.CREATE_DRAFT,
			payload: { card },
		});
	},

	updateDraft(field: string, value: string) {
		AppDispatcher.dispatch({
			type: constants.UPDATE_DRAFT,
			payload: { field, value },
		});
	},

};

export default CardActionCreator;
