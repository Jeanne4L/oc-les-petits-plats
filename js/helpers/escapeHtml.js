const escapeHtml = (value) => {
	const parsedValue = new DOMParser().parseFromString(value, 'text/html');
	return parsedValue.documentElement.textContent;
};

export default escapeHtml;
