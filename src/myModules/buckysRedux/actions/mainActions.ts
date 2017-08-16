
export const selectUser = (user: User): Action => {
	console.log("You clicked on the user: ", user.first, user.last );
	return {
		type: "USER_SELECTED",
		payload: user,
	};
};
