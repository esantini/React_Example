import React from "react";

class Clock extends React.Component {

	public state: {
		date: Date,
	};

	/** Id of the interval to clear it when the clock is unmounted. */
	private timerId: number;

	constructor(props: {}) {
		super(props);
		this.state = { date: new Date() };
	}

	public componentDidMount() {
		this.timerId = setInterval(
			() => this.tick(),
			1000,
		);
	}

	public componentWillUnmount() {
		clearInterval(this.timerId);
	}

	public render() {
		return (
			<div>
				<h1>Hello Clock:</h1>
				<h2>It is { this.state.date.toLocaleTimeString() }. </h2>
			</div>
		);
	}

	private tick() {
		this.setState({ date: new Date() });
	}

}

export default Clock;
