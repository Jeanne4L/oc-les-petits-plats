const compareWithRegex = (value, regex) => {
	const regexToMatch = new RegExp(regex, 'i');
	return regexToMatch.test(value);
};

const filterByTerm = (recipe, searchText) => {
	const { name, description, ingredients } = recipe;
	const isFoundInName = name && compareWithRegex(name, searchText);
	const isFoundInDescription =
		description && compareWithRegex(description, searchText);

	if (!ingredients) {
		return isFoundInName || isFoundInDescription;
	}

	let isFoundInIngredients = false;

	for (let i = 0; i < ingredients.length; i++) {
		if (compareWithRegex(ingredients[i].ingredient, searchText)) {
			isFoundInIngredients = true;
		}
	}

	return isFoundInName || isFoundInDescription || isFoundInIngredients;
};

const filterByKeywords = (recipe, keywordsList) => {
	const { ingredients, appliance, utensils } = recipe;
	let recipeIngredients = [];

	for (let i = 0; i < ingredients.length; i++) {
		recipeIngredients.push(ingredients[i].ingredient);
	}

	const recipeKeywords = {
		ingredient: recipeIngredients,
		appliance: [appliance],
		utensil: utensils,
	};

	for (let category in keywordsList) {
		for (let keyword of keywordsList[category]) {
			const keywordToLowerCase = keyword.toLowerCase();
			const recipeComponents = recipeKeywords[category];

			let categoryMatch = false;

			for (let i = 0; i < recipeComponents.length; i++) {
				if (recipeComponents[i].toLowerCase() === keywordToLowerCase) {
					categoryMatch = true;
					break;
				}
			}

			if (!categoryMatch) {
				return false;
			}
		}
	}

	return true;
};

const searchInRecipes = (searchText, recipes, keywordsList) => {
	const filteredRecipes = [];

	for (let i = 0; i < recipes.length; i++) {
		if (
			filterByTerm(recipes[i], searchText) &&
			filterByKeywords(recipes[i], keywordsList)
		)
			filteredRecipes.push(recipes[i]);
	}
	return filteredRecipes;
};

export default searchInRecipes;
