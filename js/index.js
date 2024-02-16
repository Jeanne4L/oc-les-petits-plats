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

	filterRecipesWithKeywords();
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
};

const toggleDropdown = () => {
	toggleDropdownButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			e.stopPropagation();

			const dropdown = button.closest('.dropdown');
			const openDropdowns = document.querySelectorAll('.expanded-dropdown');

			openDropdowns.forEach((openDropdown) => {
				if (openDropdown !== dropdown) {
					openDropdown.classList.remove('expanded-dropdown');
					const openButton = openDropdown.querySelector('.top-button');
					if (openButton) {
						openButton.classList.remove('top-button');
					}
				}
			});

			button.classList.contains('top-button')
				? button.classList.remove('top-button')
				: button.classList.add('top-button');
			dropdown.classList.contains('expanded-dropdown')
				? dropdown.classList.remove('expanded-dropdown')
				: dropdown.classList.add('expanded-dropdown');
		});
	});

	const dropdowns = document.querySelectorAll('.dropdown');

	dropdowns.forEach((dropdown) => {
		document.body.addEventListener('click', (e) => {
			const id = e.target.id;
			const idList = [
				'search-ingredient',
				'search-appliance',
				'search-utensil',
			];

			if (
				dropdown.classList.contains('expanded-dropdown') &&
				!idList.includes(id)
			) {
				dropdown.classList.remove('expanded-dropdown');

				const button = dropdown.querySelector('.top-button');
				button.classList.remove('top-button');
			}
		});
	});
};

const filterDropdownOptions = () => {
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
		dropdown.addEventListener('click', (e) => {
			if (e.target.classList.contains('option')) {
				const option = e.target;
				const optionText = option.innerText;
				console.log(option.closest('ul'));
				const dropdownCategory = option.closest('ul').id;

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

				removeTags();
			}
		});
	});
};

displayRecipeData(recipes);
toggleDropdown();
filterDropdownOptions();
filterRecipesWithMainSearchBar();
// filterRecipesWithKeywords();
