import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

describe('When the page renders', () => {
	it('everything should be loaded without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<App />, div);
		ReactDOM.unmountComponentAtNode(div);
	});
});
