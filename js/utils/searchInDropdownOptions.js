import capitalizeWords from '../helpers/capitalizeWords.js';

const searchInDropdownOptions = (searchText, optionsList) => {
	return Array.from(optionsList).filter((option) =>
		capitalizeWords(option).includes(capitalizeWords(searchText))
	);
};

export default searchInDropdownOptions;
