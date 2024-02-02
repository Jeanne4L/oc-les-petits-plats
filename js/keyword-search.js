import compareValueWithDropdownOption from './helpers/compareValueWithDropdownOption.js'

const searchWithKeywords = (value, recipes) => {
    const ingredients = Array.from(new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient))))
    const appliances = Array.from(new Set(recipes.map(recipe => recipe.appliance)))
    const utensils = Array.from(new Set(recipes.flatMap(recipe => recipe.utensils)))

    const filteredRecipes = []

    ingredients.forEach(ingredient => {
        const searchResult = compareValueWithDropdownOption(ingredient, value)
    
        if(searchResult !== '') {
            filteredRecipes.push(...recipes.filter(recipe => recipe.ingredients.some(ingredient => ingredient.ingredient === searchResult)))
        }
    })

    appliances.forEach(appliance => {
        const searchResult = compareValueWithDropdownOption(appliance, value)
    
        if(searchResult !== '') {
            filteredRecipes.push(...recipes.filter(recipe => recipe.appliance === searchResult))
        }
    })

    utensils.forEach(utensil => {
        const searchResult = compareValueWithDropdownOption(utensil, value)
    
        if(searchResult !== '') {
            filteredRecipes.push(...recipes.filter(recipe => recipe.utensil === searchResult))
        }
    })

    return Array.from(new Set(filteredRecipes)).flat()
}

export default searchWithKeywords