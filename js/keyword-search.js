const searchByKeywords = (keywords, recipes) => {
	const keywordsArray = Array.from(keywords);

	const filteredRecipes = recipes.filter((recipe) => {
		const recipeKeywords = [
			...(recipe.ingredients || []).map((ingredient) =>
				ingredient.ingredient.toLowerCase()
			),
			(recipe.appliance || '').toLowerCase(),
			...(recipe.utensils || []).map((utensil) => utensil.toLowerCase()),
		];

		return keywordsArray.every((keyword) => {
			const keywordToLowerCase = keyword.toLowerCase();
			return recipeKeywords.some((recipeKeyword) =>
				recipeKeyword.includes(keywordToLowerCase)
			);
		});
	});

	return filteredRecipes;
};

export default searchByKeywords;
