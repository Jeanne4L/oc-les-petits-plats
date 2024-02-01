import { recipes } from '../data/recipes.js'
import recipeTemplate from './template/recipe-template.js'
import tagTemplate from './template/tag-template.js'

const toggleDropdownButtons = document.querySelectorAll('.down-button')

const ingredients = new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient)))
const appliances = new Set(recipes.map(recipe => recipe.appliance))
const utensils = new Set(recipes.flatMap(recipe => recipe.utensils))
const tagsList = new Set()

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

const toggleDropdown = () => {
    toggleDropdownButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dropdown = button.closest('.dropdown')
    
            button.classList.contains('top-button') ? button.classList.remove('top-button') : button.classList.add('top-button')
            dropdown.classList.contains('expanded-dropdown') ? dropdown.classList.remove('expanded-dropdown') : dropdown.classList.add('expanded-dropdown')
        })
    })
}


const displaySearchTags = (tagsArray) => {
    tagsArray.forEach(tag => {
        tagTemplate(tag)
    }) 
}
// TODO display tag when submit
displaySearchTags(tagsList)

const tagButtons = document.querySelectorAll('.tag button')

if(tagButtons) {
    tagButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tag = button.closest('.tag')
            const tagValue = tag.querySelector('.tag-value').value

            tagsList.delete(tagValue)
            tag.remove()
        })
    })
}

const displayRecipeData = () => {
    displayRecipesElements()
    displayRecipesAccount()
    displayDropdownContent()
    
    toggleDropdown()
}
displayRecipeData()
