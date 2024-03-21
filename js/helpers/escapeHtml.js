const escapeHtml = (value) => {
	return value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

export default escapeHtml;
