module.exports = {
	"env": {
			"browser": true,
			"es6": true,
			"commonjs": true,
			"node": true,
			"mocha": true,
			"jest": true
	},
	"extends": "airbnb",
	"globals": {
			"Atomics": "readonly",
			"SharedArrayBuffer": "readonly"
	},
	"parser": "babel-eslint",
	"parserOptions": {
			"ecmaFeatures": {
					"jsx": true
			},
			"ecmaVersion": 2018,
			"sourceType": "module"
	},
	"plugins": [
			"react"
	],
	"rules": {
			"indent": [2, "tab"],
			"react/jsx-indent": [2, "tab"],
			"react/jsx-indent-props": [2, "tab"],
			
			"no-tabs": 0,
			"no-prototype-builtins": 0,
			"new-cap": 0,
			
			"jsx-a11y/click-events-have-key-events": "off",
			"import/no-extraneous-dependencies": "off"
	}
};