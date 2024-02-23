const compareWithRegex = (value, regex) => {
	const regexToMatch = new RegExp(regex, 'i');
	return regexToMatch.test(value);
};

const filterByTerm = (recipe, searchText) => {
	const isFoundInName =
		recipe.name && compareWithRegex(recipe.name, searchText);
	const isFoundInDescription =
		recipe.description && compareWithRegex(recipe.description, searchText);
	let isFoundInIngredients = false;
	if (recipe.ingredients) {
		const ingredients = recipe.ingredients;
		for (let i = 0; i < ingredients.length; i++) {
			if (compareWithRegex(ingredients[i].ingredient, searchText)) {
				isFoundInIngredients = true;
			}
		}
	}

	return isFoundInName || isFoundInDescription || isFoundInIngredients;
};

const filterByKeywords = (recipe, keywordsList) => {
	const allIngredients = recipe.ingredients;
	const allAppliances = recipe.appliance;
	const allUtensils = recipe.utensils;

	const recipeKeywords = {
		ingredient: [],
		appliance: [],
		utensil: [],
	};

	for (let i = 0; i < allIngredients.length; i++) {
		const recipeIngredients = allIngredients[i].ingredient;
		recipeKeywords.ingredient.push(recipeIngredients.toLowerCase());
	}

	recipeKeywords.appliance.push(allAppliances.toLowerCase());

	for (let i = 0; i < allUtensils.length; i++) {
		const recipeUtensils = allUtensils[i];
		recipeKeywords.utensil.push(recipeUtensils.toLowerCase());
	}

	for (const category in keywordsList) {
		if (!keywordsList.hasOwnProperty(category)) {
			continue;
		}

		const categoryMatch = keywordsList[category].every((keyword) => {
			const keywordToLowerCase = keyword.toLowerCase();
			const categories = recipeKeywords[category];
			for (let i = 0; i < categories.length; i++) {
				if (compareWithRegex(categories[i], keywordToLowerCase)) {
					return categories[i];
				}
			}
		});

		if (!categoryMatch) {
			return false;
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
