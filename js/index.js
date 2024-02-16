import { recipes } from '../data/recipes.js';
import recipeTemplate from './template/recipe.js';
import createTagElement from './template/tag.js';
import capitalizeWords from './helpers/capitalizeWords.js';
import searchInRecipes from './main-search.js';

const toggleDropdownButtons = document.querySelectorAll('.down-button');
const mainSearchForm = document.querySelector('#main-search');
const mainSearchInput = mainSearchForm.querySelector('input');
const tagsContainer = document.querySelector('.tags-container');

let searchText = '';
const tagsList = {
	ingredient: [],
	appliance: [],
	utensil: [],
};
let filteredRecipes = recipes.slice();

const displayDropdownContent = (recipes) => {
	let ingredients = new Set(
		recipes.flatMap((recipe) =>
			recipe.ingredients.map((ingredient) => ingredient.ingredient)
		)
	);

	ingredients = Array.from(ingredients).filter(
		(ingredient) =>
			!tagsList['ingredient'].includes(capitalizeWords(ingredient))
	);

	let appliances = new Set(recipes.map((recipe) => recipe.appliance));

	appliances = Array.from(appliances).filter(
		(appliance) => !tagsList['appliance'].includes(capitalizeWords(appliance))
	);

	let utensils = new Set(recipes.flatMap((recipe) => recipe.utensils));

	utensils = Array.from(utensils).filter(
		(utensil) => !tagsList['utensil'].includes(capitalizeWords(utensil))
	);

	const ingredientDropdown = document.querySelector('#ingredient');
	const applianceDropdown = document.querySelector('#appliance');
	const utensilDropdown = document.querySelector('#utensil');

	ingredientDropdown.innerHTML = '';
	applianceDropdown.innerHTML = '';
	utensilDropdown.innerHTML = '';

	ingredients.forEach((ingredient) => {
		const option = document.createElement('span');
		option.classList.add('dropdown-option', 'option');
		option.textContent = ingredient;

		ingredientDropdown.appendChild(option);
	});

	appliances.forEach((appliance) => {
		const option = document.createElement('span');
		option.classList.add('dropdown-option', 'option');
		option.textContent = appliance;

		applianceDropdown.appendChild(option);
	});

	utensils.forEach((utensil) => {
		const option = document.createElement('span');
		option.classList.add('dropdown-option', 'option');
		option.textContent = utensil;

		utensilDropdown.appendChild(option);
	});
};

const displayRecipesAmount = (recipes) => {
	document.querySelector('.recipes-amount').textContent = `${
		recipes.length
	} recette${recipes.length >= 2 ? 's' : ''}`;
};

const displayRecipesElements = (recipes) => {
	document.querySelector('.recipes').innerHTML = '';

	if (recipes.length === 0) {
		const message = document.createElement('p');
		message.innerText = `Aucune recette ne contient ${tagsList.tagsList} ou ${searchText} vous pouvez chercher "
        tarte aux pommes ", " poisson ", etc.`;
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
		document.body.addEventListener('click', () => {
			if (dropdown.classList.contains('expanded-dropdown')) {
				dropdown.classList.remove('expanded-dropdown');

				const button = dropdown.querySelector('.top-button');
				button.classList.remove('top-button');
			}
		});
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

const mainSearch = () => {
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

const keywordsSearch = () => {
	const dropdowns = document.querySelectorAll('.dropdown');

	dropdowns.forEach((dropdown) => {
		dropdown.addEventListener('click', (e) => {
			if (e.target.classList.contains('option')) {
				const option = e.target;
				const optionText = option.innerText;
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
mainSearch();
keywordsSearch();
