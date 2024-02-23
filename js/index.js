import { recipes } from '../data/recipes.js';
import recipeTemplate from './template/recipe.js';
import createTagElement from './template/tag.js';
import capitalizeWords from './helpers/capitalizeWords.js';
import searchInRecipes from './utils/searchInRecipes.js';
import searchInDropdownOptions from './utils/searchInDropdownOptions.js';

const mainSearchForm = document.querySelector('#main-search');
const mainSearchInput = mainSearchForm.querySelector('input');
const tagsContainer = document.querySelector('.tags-container');
const toggleDropdownButtons = document.querySelectorAll('.down-button');
const ingredientDropdown = document.querySelector('#ingredient');
const applianceDropdown = document.querySelector('#appliance');
const utensilDropdown = document.querySelector('#utensil');

let searchText = '';
const tagsList = {
	ingredient: [],
	appliance: [],
	utensil: [],
};
let filteredRecipes = recipes.slice();
let filteredOptions;

const filterArrayByTags = (arrayToFilter, tagsArray) => {
	return Array.from(arrayToFilter).filter(
		(element) => !tagsList[tagsArray].includes(capitalizeWords(element))
	);
};

const createDropdownContent = (elementsToDisplay, dropdown) => {
	dropdown.innerHTML = '';

	elementsToDisplay.forEach((element) => {
		const option = document.createElement('span');
		option.classList.add('dropdown-option', 'option');
		option.textContent = element;

		dropdown.appendChild(option);
	});
};

const displayDropdownContent = (recipes) => {
	let ingredients = new Set(
		recipes.flatMap((recipe) =>
			recipe.ingredients.map((ingredient) => ingredient.ingredient)
		)
	);
	ingredients = filterArrayByTags(ingredients, 'ingredient');

	let appliances = new Set(recipes.map((recipe) => recipe.appliance));
	appliances = filterArrayByTags(appliances, 'appliance');

	let utensils = new Set(recipes.flatMap((recipe) => recipe.utensils));
	utensils = filterArrayByTags(utensils, 'utensil');

	createDropdownContent(ingredients, ingredientDropdown);
	createDropdownContent(appliances, applianceDropdown);
	createDropdownContent(utensils, utensilDropdown);
};

const displayRecipesAmount = (recipes) => {
	document.querySelector('.recipes-amount').textContent = `${
		recipes.length
	} recette${recipes.length >= 2 ? 's' : ''}`;
};

const displayRecipesElements = (recipes) => {
	const recipesContainer = document.querySelector('.recipes');
	recipesContainer.innerHTML = '';

	if (!recipes.length) {
		const message = document.querySelector('.not-found');
		const searchElt = document.querySelector('.search');

		message.classList.remove('hidden');
		searchElt.innerText = searchText;
	}
	recipes.forEach((recipe) => {
		recipeTemplate(recipe);
	});
};

const displayRecipeData = (recipes) => {
	displayRecipesElements(recipes);
	displayRecipesAmount(recipes);
	displayDropdownContent(recipes);
	filterDropdownOptions(recipes);
	filterRecipesWithKeywords();
};

const filterDropdownOptions = (recipes) => {
	const ingredientInput = document.querySelector('#search-ingredient');
	const applianceInput = document.querySelector('#search-appliance');
	const utensilInput = document.querySelector('#search-utensil');

	const filterOptions = (e) => {
		const id = e.target.id;

		const ingredients = new Set(
			recipes.flatMap((recipe) =>
				recipe.ingredients.map((ingredient) => ingredient.ingredient)
			)
		);
		const appliances = new Set(recipes.map((recipe) => recipe.appliance));
		const utensils = new Set(recipes.flatMap((recipe) => recipe.utensils));

		switch (id) {
			case 'search-ingredient':
				filteredOptions = searchInDropdownOptions(e.target.value, ingredients);
				createDropdownContent(filteredOptions, ingredientDropdown);
				break;
			case 'search-appliance':
				filteredOptions = searchInDropdownOptions(e.target.value, appliances);
				createDropdownContent(filteredOptions, applianceDropdown);
				break;
			case 'search-utensil':
				filteredOptions = searchInDropdownOptions(e.target.value, utensils);
				createDropdownContent(filteredOptions, utensilDropdown);
				break;
			default:
				return;
		}
	};

	ingredientInput.addEventListener('input', (e) => filterOptions(e));
	applianceInput.addEventListener('input', (e) => filterOptions(e));
	utensilInput.addEventListener('input', (e) => filterOptions(e));
};

const closeDropdown = (button, dropdown) => {
	button.classList.remove('top-button');
	dropdown.classList.remove('expanded-dropdown');
	dropdown.querySelector('.option-search-input').value = '';
};

const closeAllDropdownsExcept = (currentButton) => {
	toggleDropdownButtons.forEach((button) => {
		if (button !== currentButton) {
			const dropdown = button.closest('.dropdown');
			closeDropdown(button, dropdown);
		}
	});
};

const removeTags = () => {
	const tagButtons = document.querySelectorAll('.tag button');

	tagButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const tag = button.closest('.tag');
			const tagValue = tag.innerText;

			for (const category in tagsList) {
				for (const tag of tagsList[category]) {
					const index = tagsList[category].indexOf(tagValue);

					index !== -1 && tagsList[category].splice(index, 1);
				}
			}
			tag.remove();

			filteredRecipes = searchInRecipes(searchText, recipes, tagsList);
			displayRecipeData(filteredRecipes);
		});
	});
};

const filterRecipesWithMainSearchBar = () => {
	mainSearchForm.addEventListener('submit', (e) => e.preventDefault());

	mainSearchInput.addEventListener('input', (e) => {
		if (e.target.value.length < 3) {
			searchText = '';
		} else {
			searchText = e.target.value;
		}

		filteredRecipes = searchInRecipes(searchText, recipes, tagsList);

		displayRecipeData(filteredRecipes);
	});
};

const filterRecipesWithKeywords = () => {
	const dropdowns = document.querySelectorAll('.dropdown');

	dropdowns.forEach((dropdown) => {
		let isDropdownProcessed = false;

		dropdown.addEventListener('click', (e) => {
			const option = e.target;
			if (!isDropdownProcessed && option.classList.contains('option')) {
				const dropdownCategoryElement = option.closest('.dropdown-options');

				if (dropdownCategoryElement) {
					const optionText = option.innerText;
					const dropdownCategory = dropdownCategoryElement.id;

					tagsList[dropdownCategory].push(optionText);

					tagsContainer.innerHTML = '';

					for (const key in tagsList) {
						for (const value of tagsList[key]) {
							createTagElement(value);
						}
					}

					filteredRecipes = searchInRecipes(
						searchText,
						filteredRecipes,
						tagsList
					);
					displayRecipeData(filteredRecipes);

					const button = dropdown.querySelector('.top-button');

					if (button) {
						button.classList.toggle('top-button');
						dropdown.classList.toggle('expanded-dropdown');
						dropdown.querySelector('.option-search-input').value = '';
						removeTags();
					}
				}

				isDropdownProcessed = true;
			}
		});
	});
};

displayRecipeData(recipes);
filterRecipesWithMainSearchBar();

toggleDropdownButtons.forEach((button) => {
	button.addEventListener('click', (e) => {
		e.stopPropagation();
		closeAllDropdownsExcept(button);

		button.classList.toggle('top-button');
		const dropdown = button.closest('.dropdown');
		dropdown.classList.toggle('expanded-dropdown');
		dropdown.querySelector('.option-search-input').value = '';
	});
});

document.body.addEventListener('click', (e) => {
	const openedDropdowns = document.querySelectorAll(
		'.dropdown.expanded-dropdown'
	);
	if (!openedDropdowns.length) return;

	const isDropdownOption = e.target.classList.contains('dropdown-option');
	const isSearchInput = e.target.classList.contains('option-search-input');

	if (!isDropdownOption && !isSearchInput) {
		openedDropdowns.forEach((dropdown) => {
			const button = dropdown.querySelector('.top-button');
			closeDropdown(button, dropdown);
		});
	}
});
