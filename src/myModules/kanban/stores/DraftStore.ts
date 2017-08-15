import { ReduceStore } from "flux/utils";
import update from "immutability-helper";

import AppDispatcher from "../../../AppDispatcher";
import constants from "../constants";

const defaultDraft = () => {
	return {
		id: Date.now(),
		title: "",
		description: "",
		status: "todo",
		color: "#c9c9c9",
		tasks: [],
	};
};

interface IAction {
	type: string;
	payload: {
		card: kanban.Card,
		[key: string]: any,
	};
}

class DraftStore extends ReduceStore<{}, {}> {

	public getInitialState() {
		return {};
	}

	public reduce(state: {}, action: IAction) {

		switch (action.type) {

			case constants.CREATE_DRAFT:
				if (action.payload.card) {
					return update(this.getState(), {
						$set: action.payload.card,
					});
				} else {
					return defaultDraft();
				}

			case constants.UPDATE_DRAFT:
				return update(this.getState(), {
					[action.payload.field]: {
						$set: action.payload.value,
					},
				});

			default:
				return state;
		}
	}
}

export default new DraftStore(AppDispatcher);
