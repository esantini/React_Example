import { ReduceStore } from "flux/utils";

import AppDispatcher from "../../../AppDispatcher";
import constants from "../constants";

interface IAction {
	type: string;
	payload: {
		response: kanban.Card[];
	};
}

class CardStore extends ReduceStore< kanban.Card[] , any > {

	public getInitialState() {
		return [];
	}

	public reduce(state: kanban.Card[], action: IAction ) {

		switch (action.type) {
			case constants.FETCH_CARDS_SUCCESS:
				return action.payload.response;

			default:
				return state;
		}

	}

	// protected getCard(id: number) {
	// 	return (this as any)._state.find((card: kanban.Card) => card.id === id);
	// }

	// protected getCardIndex(id: number) {
	// 	return (this as any)._state.findIndex(( card: kanban.Card) => card.id === id);
	// }

}

export default new CardStore(AppDispatcher);
