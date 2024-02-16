const capitalizeWords = (string) => {
	return string.replace(/\b\w/g, (match) => match.toUpperCase());
};

export default capitalizeWords;
