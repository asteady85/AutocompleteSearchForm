/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */
import React from 'react';
import { Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { resultKeyToType } from '../utils/functions';
import '../css/list.css';

/**
 * Contains header content on page
 */
function AutocompleteList(props) {
	const {
		activeSuggestion, suggestions,
	} = props;

	return (
		<ol className="suggestions">
			{
				(suggestions.length)
					? suggestions.map((suggestion, index) => {
						let className;

						// Flag the active suggestion with a class
						if (index === activeSuggestion) {
							className = 'suggestion-active';
						}

						return (
							<li className={className} key={suggestion.placeKey} onClick={props.onClick}>
								<div className={`suggestionResult pill ${suggestion.placeType}`}>
									<Badge variant="secondary">{resultKeyToType(suggestion.placeType)}</Badge>
								</div>
								<div className="suggestionResult details">
									<span className="name">{suggestion.name}</span>
									<br />
									<span className="region">{suggestion.region}</span>
								</div>
							</li>
						);
					})
					: (
						<li key="resultsnotfound">
							<span className="suggestionResult">No results found</span>
						</li>
					)
			}
		</ol>
	);
}

export default AutocompleteList;

AutocompleteList.defaultProps = {
	activeSuggestion: 0,
	onClick: () => {},
};
AutocompleteList.propTypes = {
	activeSuggestion: PropTypes.number,
	onClick: PropTypes.func,
	suggestions: PropTypes.instanceOf(Array).isRequired,
};
