const searchInRecipes = (searchText, recipes, tags) => {
	const filteredRecipes = [];

	if (searchText !== '') {
		const searchTextToLowerCase = searchText.toLowerCase();

		filteredRecipes.push(
			...recipes.filter((recipe) => {
				const isFoundInName =
					recipe.name &&
					recipe.name.toLowerCase().includes(searchTextToLowerCase);
				const isFoundInDescription =
					recipe.description &&
					recipe.description.toLowerCase().includes(searchTextToLowerCase);
				const isFoundInIngredients =
					recipe.ingredients &&
					recipe.ingredients.some((ingredient) =>
						ingredient.ingredient.toLowerCase().includes(searchTextToLowerCase)
					);

				return isFoundInName || isFoundInDescription || isFoundInIngredients;
			})
		);

		if (tags) {
			tags.forEach((tag) => {
				filteredRecipes.push(
					...recipes.filter((recipe) => {
						const tagToLowerCase = tag.toLowerCase();
						const isFoundInName =
							recipe.name && recipe.name.toLowerCase().includes(tagToLowerCase);
						const isFoundInDescription =
							recipe.description &&
							recipe.description.toLowerCase().includes(tagToLowerCase);
						const isFoundInIngredients =
							recipe.ingredients &&
							recipe.ingredients.some((ingredient) =>
								ingredient.ingredient.toLowerCase().includes(tagToLowerCase)
							);

						return (
							isFoundInName || isFoundInDescription || isFoundInIngredients
						);
					})
				);
			});
		}
	}

	return Array.from(new Set(filteredRecipes)).flat();
};

export default searchInRecipes;
