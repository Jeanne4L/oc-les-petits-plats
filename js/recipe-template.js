const createRecipeElement = (recipeData) => {
    const article = document.createElement('article');

    const img = document.createElement('img');
    img.src = `images/recipes/${recipeData.image}`;
    img.alt = recipeData.name;
    img.setAttribute('loading', 'lazy')

    const description = document.createElement('div');
    description.classList.add('recipes-description');

    const h3 = document.createElement('h3');
    h3.textContent = recipeData.name;

    const firstSubtitle = document.createElement('span');
    firstSubtitle.classList.add('uppercase');
    firstSubtitle.textContent = 'Recette';

    const p = document.createElement('p');
    p.textContent = recipeData.description;

    const secondSubtitle = document.createElement('span');
    secondSubtitle.classList.add('uppercase');
    secondSubtitle.textContent = 'Ingrédients';

    const ingredientsContainer = document.createElement('div');
    ingredientsContainer.classList.add('ingredients-container');

    recipeData.ingredients.forEach(ingredient => {
        const ingredientDiv = document.createElement('div');
        const spanIngredient = document.createElement('span');
        spanIngredient.textContent = ingredient.ingredient;

        const spanQuantity = document.createElement('span');
        spanQuantity.classList.add('quantity');
        const qty = ingredient.quantity ? ingredient.quantity : ''
        const unit = ingredient.unit ? ingredient.unit : ''

        spanQuantity.textContent = `${qty} ${unit}`;

        ingredientDiv.appendChild(spanIngredient);
        ingredientDiv.appendChild(spanQuantity);
        ingredientsContainer.appendChild(ingredientDiv);
    });

    description.appendChild(h3);
    description.appendChild(firstSubtitle);
    description.appendChild(p);
    description.appendChild(secondSubtitle);
    description.appendChild(ingredientsContainer);

    article.appendChild(img);
    article.appendChild(description);

    document.querySelector('.recipes').appendChild(article);
}

export default createRecipeElement