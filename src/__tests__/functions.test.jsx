const functions = require('../utils/functions.jsx');

describe('GIVEN I am converting the place key to a friendly name', () => {
	it('WHEN `A` is passed THEN `Airport` should be returned', () => {
		const response = functions.resultKeyToType('A');
		expect(response).toEqual('Airport');
	});
	it('WHEN `C` is passed THEN `City` should be returned', () => {
		const response = functions.resultKeyToType('C');
		expect(response).toEqual('City');
	});
	it('WHEN `T` is passed THEN `Train` should be returned', () => {
		const response = functions.resultKeyToType('T');
		expect(response).toEqual('Train');
	});
	it('WHEN `P` is passed THEN `Unknown` should be returned', () => {
		const response = functions.resultKeyToType('P');
		expect(response).toEqual('Unknown');
	});
});
