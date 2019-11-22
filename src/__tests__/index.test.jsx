import ReactDOM from 'react-dom';

require('../index.jsx');

jest.mock('react-dom');

it('renders without crashing', () => {
	expect(ReactDOM.render).toBeCalled();
});
