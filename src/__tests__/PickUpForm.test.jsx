import React from 'react';
import { mount, shallow } from 'enzyme';
import PickUpForm from '../components/PickUpForm';

jest.useFakeTimers();
const apiDataMan = require('./mocks/autocomplete-man.json');

// Test 1
describe('GIVEN I am a visitor to the rentalcars.com homepage', () => {
	const wrapper = mount(<PickUpForm />);
	describe('WHEN the page is loaded', () => {
		// AC1
		it('THEN I should see a Search Widget', () => {
			expect(wrapper.find('form#searchWidget').length).toEqual(1);
		});
		// AC2
		it('AND a text box labelled `Pick-up Location`', () => {
			expect(wrapper.find('form#searchWidget label').at(0).text()).toEqual('Pick-up Location');
		});
		it('AND the placeholder text reads `city, airport, station, region and district...`', () => {
			const input = wrapper.find('form#searchWidget input').at(0);
			expect(input.prop('placeholder')).toEqual('city, airport, station, region and district...');
		});
	});
	describe('AA Criteria', () => {
		// AC4
		it('WHEN I use a screen reader THEN the correct criteria is read out for the `&#39;`Pick Up Location` box', () => {
			const input = wrapper.find('form#searchWidget input').at(0);
			expect(input.prop('aria-placeholder')).toEqual('city, airport, station, region or district');
		});
	});
});

// Test 2
describe('GIVEN I am a visitor on the Search Box within the rentalcars.com homepage', () => {
	// AC1
	describe('WHEN I enter a single alphanumeric character into the pick up location', () => {
		const wrapper = mount(<PickUpForm />);
		it('THEN no search results list is displayed', () => {
			const input = wrapper.find('form#searchWidget input').at(0);
			expect(input.instance().value).toEqual('');
			input.simulate('change', { target: { value: 'm' } });
			jest.runAllTimers();
			expect(input.instance().value).toEqual('m');
			expect(wrapper.state('suggestions')).toEqual([]);
		});
	});

	// AC2 and AC3
	describe('WHEN I enter 2 or more alphanumeric characters into the pick up location', () => {
		beforeEach(() => {
			fetch.resetMocks();
		});

		it('THEN I see a list of search results', async (done) => {
			const wrapper = shallow(<PickUpForm />);
			fetch.mockResponseOnce(JSON.stringify(apiDataMan));
			const spy = jest.spyOn(wrapper.instance(), 'getSuggestions');
			const input = wrapper.find('FormGroup#searchWidget FormControl').at(0);
			await input.simulate('change', { target: { value: 'man' } });

			// Fast-forward until all timers have been executed
			jest.runAllTimers();

			process.nextTick(() => {
				// jest.setTimeout(1000);
				expect(spy).toHaveBeenCalled();
				expect(wrapper.state('inputVal')).toEqual('man');
				expect(wrapper.state('suggestions').length).toEqual(6);
				expect(wrapper.find('AutocompleteList').prop('suggestions').length).toEqual(6);
				done();
			});
		});

		it('When a search term is not recognised THEN I should see the message `No results found`', async (done) => {
			const wrapper = shallow(<PickUpForm />);
			fetch.mockResponseOnce('{"results":{"numFound":0}}');
			const spy = jest.spyOn(wrapper.instance(), 'getSuggestions');
			const input = wrapper.find('FormGroup#searchWidget FormControl').at(0);
			await input.simulate('change', { target: { value: 'someunknownresult' } });

			// Fast-forward until all timers have been executed
			jest.runAllTimers();

			process.nextTick(() => {
				// jest.setTimeout(1000);
				expect(spy).toHaveBeenCalled();
				expect(wrapper.state('inputVal')).toEqual('someunknownresult');
				expect(wrapper.state('suggestions').length).toEqual(0);
				expect(wrapper.find('AutocompleteList').prop('activeSuggestion')).toEqual(0);
				expect(wrapper.find('AutocompleteList').prop('suggestions')).toEqual([]);
				done();
			});
		});
	});
});
