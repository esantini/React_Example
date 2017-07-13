import React from 'react';

class Toggle extends React.Component {
	props: {
		/**
		 * Query for elements with the "target" string & apply the className: "toggleOn / toggleOff"
		 */
		target?: string
	}
	state: {
		isToggleOn: boolean 
	}
	
	constructor(props: { target?: string }) {
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
		
		let newVal = !this.state.isToggleOn;
		this.setState(prevState => ({
			isToggleOn: newVal // !prevState.isToggleOn
		}));
		if(this.props.target) {
			document.querySelectorAll(this.props.target)
				.forEach(function(element) {
					element.classList.toggle('toggleOn', newVal);
					element.classList.toggle('toggleOff', !newVal);
				});
		}
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