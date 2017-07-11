import React from 'react';

class Clock extends React.Component {
	 /** Id of the interval to clear it when the clock is unmounted. */
	timerId: number;
	state: {
		date: Date
	}
	
	constructor(props: {}) {
		super(props);
		this.state = { date: new Date() };
	}

	tick() {
		this.setState({ date: new Date() });
	}

	componentDidMount() {
		this.timerId = setInterval(
			() => this.tick(),
			1000
		);
	}
	componentWillUnmount() {
		clearInterval(this.timerId);
		console.log('unmounted.');
	}

	render() {
		return (
			<div>
				<h1>Hello Clock:</h1>
				<h2>It is { this.state.date.toLocaleTimeString() }. </h2>
			</div>
		);
	}
}

export default Clock;