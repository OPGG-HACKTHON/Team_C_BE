module.exports = (time) => {
	return new Date(Date.parse(time) + 1000 * 60 * 60 * 9);
};
