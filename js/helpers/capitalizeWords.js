const capitalizeWords = (string) => {
	return string.replace(
		/\b\w[\w'-ç]*\b/g,
		(match) => match.charAt(0).toUpperCase() + match.slice(1)
	);
};

export default capitalizeWords;
