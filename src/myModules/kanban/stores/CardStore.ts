import { ReduceStore } from "flux/utils";

import AppDispatcher from "../../../AppDispatcher";

class CardStore extends ReduceStore< kanban.Card[] , any > {

	public getInitialState() {
		return [];
	}

	public reduce(state: kanban.Card[], action: {type: string} ) {

		switch (action.type) {
			default:
				return state;
		}

	}

}

export default new CardStore(AppDispatcher);
