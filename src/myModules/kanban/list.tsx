import React from "react";

class List extends React.Component {
	public props: {
		id: string,
		title: string,
		cards: {},
	};

	public render() {
		return <h3>I'm a List</h3>;
	}
}

export default List;
