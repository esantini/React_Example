import React from 'react';

class Toggle extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isToggleOn: false };

		// This binding is necessary to make `this` work in the callback
			// * unless you do the experimental: "Property initializer syntax"
		// this.handleClick = this.handleClick.bind(this);
	}

	// This syntax ensures `this` is bound within handleClick.
	// Warning: this is *experimental* syntax.
	handleClick = () => {
		// console.log('hmmm'); // <- Searched for this in bundle.js
		// After checking bundle.js: The experimental syntax puts the handleClick inside the constructor.
		
		this.setState(prevState => ({
			isToggleOn: !prevState.isToggleOn
		}));

	}

	render() {
		return (
			<button onClick={this.handleClick}>
				{ this.state.isToggleOn ? 'ON' : 'OFF' }
			</button>
		);
	}
}

export default Toggle;