module.exports = {
	'.{ts,js}': ['eslint --fix', 'git add'],
	'*.{js,ts,html,json,md}': ['prettier --write', 'git add']
};
