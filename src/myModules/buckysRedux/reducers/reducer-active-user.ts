
export default function(state = null, action: Action) {
	switch (action.type) {
		case "USER_SELECTED":
			return action.payload;
	}
	return state;
}
