import recipeTemplate from '../js/recipe-template.js'

const displayRecipeElts = () => {
    recipes.forEach((recipe) => {
        recipeTemplate(recipe)
    })
}
displayRecipeElts()