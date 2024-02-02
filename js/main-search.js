import compareValueWithDropdownOption from './helpers/compareValueWithDropdownOption.js'

const searchInRecipes = (value, recipes) => {
    const names = new Set(recipes.map(recipe => recipe.name))
    const descriptions = new Set(recipes.map(recipe => recipe.description))
    const ingredients = new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient)))
    const filteredRecipes = []

    for(let name of names) {
        const searchResult = compareValueWithDropdownOption(name, value)

        if(searchResult !== '') {
            filteredRecipes.push(...recipes.filter(recipe => recipe.name === searchResult))
        }
    }

    for(let ingredient of ingredients) {
        const searchResult = compareValueWithDropdownOption(ingredient, value)

        if(searchResult !== '') {
            filteredRecipes.push(...recipes.filter(recipe => recipe.ingredients.some(ingredient => ingredient.ingredient === searchResult)))
        }
    }

    for(let description of descriptions) {
        const searchResult = compareValueWithDropdownOption(description, value)

        if(searchResult !== '') {
            filteredRecipes.push(...recipes.filter(recipe => recipe.description === searchResult))
        }
    }

    return Array.from(new Set(filteredRecipes)).flat()
}

export default searchInRecipes