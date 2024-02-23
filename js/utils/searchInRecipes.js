const filterByTerm = (recipe, searchText) => {
	const isFoundInName =
		recipe.name && recipe.name.toLowerCase().includes(searchText);
	const isFoundInDescription =
		recipe.description && recipe.description.toLowerCase().includes(searchText);
	const isFoundInIngredients =
		recipe.ingredients &&
		recipe.ingredients.some((ingredient) =>
			ingredient.ingredient.toLowerCase().includes(searchText)
		);

	return isFoundInName || isFoundInDescription || isFoundInIngredients;
};

const filterByKeywords = (recipe, keywordsList) => {
	const recipeKeywords = {
		ingredient: [
			...(recipe.ingredients || []).map((ingredient) =>
				ingredient.ingredient.toLowerCase()
			),
		],
		appliance: [(recipe.appliance || '').toLowerCase()],
		utensil: [
			...(recipe.utensils || []).map((utensil) => utensil.toLowerCase()),
		],
	};

	for (const category in keywordsList) {
		if (!keywordsList.hasOwnProperty(category)) {
			continue;
		}

		const categoryMatch = keywordsList[category].every((keyword) => {
			const keywordToLowerCase = keyword.toLowerCase();
			return recipeKeywords[category].some((recipeKeyword) =>
				recipeKeyword.includes(keywordToLowerCase)
			);
		});

		if (!categoryMatch) {
			return false;
		}
	}
	return true;
};

const searchInRecipes = (searchText, recipes, keywordsList) => {
	return recipes.filter(
		(recipe) =>
			filterByTerm(recipe, searchText) && filterByKeywords(recipe, keywordsList)
	);
};

export default searchInRecipes;
