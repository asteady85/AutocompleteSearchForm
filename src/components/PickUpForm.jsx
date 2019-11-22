import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import AutocompleteList from './AutocompleteList';

/**
 * Displays the destination form
 */
class PickUpForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeSuggestion: 0,
			minimumInput: 2,
			filteredSuggestions: [],
			inputVal: '',
			showSuggestions: false,
			suggestions: [],
			throttleResponseCall: 500,
		};

		this.throttleTimer = null;

		this.getSuggestions = this.getSuggestions.bind(this);
		this.changeInput = this.changeInput.bind(this);
	}

	componentWillUnmount() {
		// Stop all timers
		clearInterval(this.timerCountdown);
		// Reset variables
		this.throttleTimer = null;
	}

	/**
	 * Fetches list of places based on the user input
	 * @returns {array} as list
	 */
	async getSuggestions() {
		const { inputVal } = this.state;
		return fetch(`https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=${inputVal}`)
			.then((response) => {
				if (response.status >= 400 && response.status < 600) {
					throw new Error('Bad response from API');
				}
				return response.json();
			})
			.then((body) => ((body.results.numFound > 0) ? body.results.docs : []))
			.catch(() => ([]));
	}

	/**
	 * Event fired when the input value is changed
	 */
	changeInput = (e) => {
		const inputVal = e.target.value;
		const { minimumInput, throttleResponseCall, suggestions } = this.state;

		// clear current timer if runnning
		clearInterval(this.timerCountdown);
		// set new timer
		this.timerCountdown = setTimeout(async () => {
			// when timer runs out generate list
			let newSuggestions = [];
			if (inputVal.length >= minimumInput) {
				newSuggestions = await this.getSuggestions(inputVal);
			}
			this.setState({
				suggestions: newSuggestions,
				filteredSuggestions: [],
				showSuggestions: (inputVal.length >= minimumInput),
			});
		}, throttleResponseCall);

		// Filter current list based on user input
		let filteredSuggestions = [];
		if (inputVal.length >= minimumInput) {
			filteredSuggestions = suggestions.filter(
				(suggestion) => suggestion.name.toLowerCase().indexOf(inputVal.toLowerCase()) > -1,
			);
		}

		// Update the changes
		this.setState({
			activeSuggestion: 0,
			filteredSuggestions,
			inputVal: e.target.value,
		});
	}

	/**
	 * Event fired when the user clicks on a suggestion. The selection will update the input box
	 */
	onClick = (e) => {
		this.setState({
			activeSuggestion: 0,
			filteredSuggestions: [],
			showSuggestions: false,
			inputVal: e.currentTarget.querySelectorAll('span.name')[0].innerText,
		});
	};

	render() {
		const {
			activeSuggestion, filteredSuggestions, showSuggestions, suggestions, inputVal,
		} = this.state;

		return (
			<>
				<Form id="searchWidget">
					<h2>Where are you going?</h2>
					<Form.Group id="searchWidget">
						<Form.Label htmlFor="pickupLocation">Pick-up Location</Form.Label>
						<Form.Control
							type="text"
							name="pickupLocation"
							id="pickupLocation"
							onChange={this.changeInput}
							placeholder="city, airport, station, region and district..."
							aria-placeholder="city, airport, station, region or district"
							value={inputVal}
						/>
						<Form.Text className="text-muted">
							{
								(showSuggestions) && (
									<AutocompleteList
										onClick={this.onClick}
										activeSuggestion={activeSuggestion}
										suggestions={(filteredSuggestions.length) ? filteredSuggestions : suggestions}
									/>
								)
							}
						</Form.Text>
					</Form.Group>
				</Form>
			</>
		);
	}
}

export default PickUpForm;

PickUpForm.defaultProps = {};
PickUpForm.propTypes = {};
