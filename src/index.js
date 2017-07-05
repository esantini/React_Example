import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

/*
	As they are now Welcome1 & Welcome2 are equivalent from React's point of view.
	BUT: classes lets us use additional features such as local state and lifecycle hooks.
*/
// eslint-disable-next-line
function Welcome1(props) {
	return <h1>Hello, {props.name} </h1>;
}
// eslint-disable-next-line
class Welcome2 extends React.Component {
	render() {
		return <h1>Hello, {this.props.name}</h1>;
	}
}
