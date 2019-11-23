module.exports = {
	/**
	 * This functions takes the result
	 * @param {array} arrayResults is an array of objects
	 */
	resultKeyToType(key) {
		switch (key) {
			case 'A':
				return 'Airport';
			case 'C':
					return 'City';
			case 'T':
					return 'Train';
			default:
				return 'Unknown';
		}
	},
};
