import React from 'react';
import { shallow } from 'enzyme';
import AutocompleteList from '../components/AutocompleteList';

describe('GIVEN that 0 suggestions are passed', () => {
	it('THEN no list will show and an error message will show to the user', () => {
		const wrapper = shallow(<AutocompleteList suggestions={[]} />);
		expect(wrapper.text()).toEqual('No results found');
	});
});
describe('GIVEN that a number suggestions are passed', () => {
	it('THEN it will show the list of suggestions in the list', () => {
		const suggestions = [
			{
				placeKey: 'key1', placeType: 'C', name: 'Suggestion 1', region: 'Region',
			},
			{
				placeKey: 'key2', placeType: 'C', name: 'Suggestion 2', region: 'Region',
			},
			{
				placeKey: 'key3', placeType: 'C', name: 'Suggestion 3', region: 'Region',
			},
		];
		const wrapper = shallow(<AutocompleteList suggestions={suggestions} />);
		expect(wrapper.find('ol.suggestions > li').length).toEqual(3);
	});
});
