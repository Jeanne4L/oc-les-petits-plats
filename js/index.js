import { recipes } from '../recipes.js'
import recipeTemplate from '../js/recipe-template.js'

const resetButtons = document.querySelectorAll('.reset-button');
const toggleDropdownButtons = document.querySelectorAll('.down-button')
const searchBarInputs = document.querySelectorAll('.search-bar input')

const ingredients = new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient)))
const appliances = new Set(recipes.flatMap(recipe => recipe.appliance))
const utensils = new Set(recipes.flatMap(recipe => recipe.utensils))

const displayDropdownContent = () => {
    const ingredientDropdown = document.querySelector('#ingredient');
    const applianceDropdown = document.querySelector('#appliance');
    const utensilDropdown = document.querySelector('#utensil');

    ingredients.forEach(ingredient => {
        const option = document.createElement('span')
        option.classList.add('dropdown-option')
        option.textContent = ingredient

        ingredientDropdown.appendChild(option)
    })

    appliances.forEach(appliance => {
        const option = document.createElement('span')
        option.classList.add('dropdown-option')
        option.textContent = appliance

        applianceDropdown.appendChild(option)
    })

    utensils.forEach(utensil => {
        const option = document.createElement('span')
        option.classList.add('dropdown-option')   
        option.textContent = utensil

        utensilDropdown.appendChild(option)
    })
}

const displayRecipesAccount = () => {
    document.querySelector('.recipes-account').textContent = recipes.length
}

const displayRecipesElements = () => {
    recipes.forEach((recipe) => {
        recipeTemplate(recipe)
    })
}

const displayResetButton = () => {
    searchBarInputs.forEach(input => {
        const searchBar = input.closest('.search-bar')
        const resetButton = searchBar.querySelector('.reset-button')

        input.addEventListener('focus', () => {
            resetButton.style.display = 'flex'
        })
    })
}

const resetInputValue = () => {
    resetButtons.forEach(button => {
        const searchBar = button.closest('.search-bar')
        const input = searchBar.querySelector('input')
    
        button.addEventListener('click', () => {
            input.value = ''
        })
    })
}

const toggleDropdown = () => {
    toggleDropdownButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dropdown = button.closest('.dropdown')
    
            button.classList.contains('top-button') ? button.classList.remove('top-button') : button.classList.add('top-button')
            dropdown.classList.contains('expanded-dropdown') ? dropdown.classList.remove('expanded-dropdown') : dropdown.classList.add('expanded-dropdown')
        })
    })
}

// TODO remove resetbutton if form submit or change + value === ''
// resetButton.style.display = 'none'


const displayRecipeData = () => {
    displayRecipesElements()
    displayRecipesAccount()
    displayDropdownContent()

    displayResetButton()
    resetInputValue()
    
    toggleDropdown()
}
displayRecipeData()
