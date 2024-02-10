import { recipes } from '../data/recipes.js';
import recipeTemplate from './template/recipe.js';
import createTagElement from './template/tag.js';
import searchInRecipes from './main-search.js';
import searchByKeywords from './keyword-search.js';

const toggleDropdownButtons = document.querySelectorAll('.down-button');
const mainSearchForm = document.querySelector('#main-search');
const mainSearchInput = mainSearchForm.querySelector('input');
const tagsContainer = document.querySelector('.tags-container');

const tagsList = new Set();
let filteredRecipes = recipes.slice();

const displayDropdownContent = (recipes) => {
	const ingredients = new Set(
		recipes.flatMap((recipe) =>
			recipe.ingredients.map((ingredient) => ingredient.ingredient)
		)
	);
	const appliances = new Set(recipes.map((recipe) => recipe.appliance));
	const utensils = new Set(recipes.flatMap((recipe) => recipe.utensils));

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

const displayRecipesamount = (recipes) => {
	document.querySelector('.recipes-amount').textContent = `${
		recipes.length
	} recette${recipes.length >= 2 ? 's' : ''}`;
};

const displayRecipesElements = (recipes) => {
	document.querySelector('.recipes').innerHTML = '';

	recipes.forEach((recipe) => {
		recipeTemplate(recipe);
	});
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

const toggleTags = () => {
	const tagButtons = document.querySelectorAll('.tag button');

	if (tagButtons) {
		tagButtons.forEach((button) => {
			button.addEventListener('click', () => {
				const tag = button.closest('.tag');
				const tagValue = tag.querySelector('.tag-value').value;

				tagsList.delete(tagValue);
				tag.remove();
				tagsList.forEach((tag) => {
					searchByKeywords(tag, recipes);
				});
			});
		});
	}
};

const mainSearch = () => {
	mainSearchForm.addEventListener('submit', (e) => e.preventDefault());

	mainSearchInput.addEventListener('input', (e) => {
		let searchText;

		if (e.target.value.length < 3) {
			searchText = '';
		} else {
			searchText = e.target.value;

			filteredRecipes = searchInRecipes(searchText, recipes);

			displayRecipesElements(filteredRecipes);
			displayRecipesamount(filteredRecipes);
			displayDropdownContent(filteredRecipes);
		}
	});
};

const keywordsSearch = () => {
	const dropdowns = document.querySelectorAll('.dropdown');

	dropdowns.forEach((dropdown) => {
		dropdown.addEventListener('click', (e) => {
			if (e.target.classList.contains('option')) {
				const optionText = e.target.innerText;

				tagsList.add(optionText);
				tagsContainer.innerHTML = '';
				tagsList.forEach((tag) => createTagElement(tag));

				filteredRecipes = searchByKeywords(tagsList, filteredRecipes);

				displayRecipesElements(filteredRecipes);
				displayRecipesamount(filteredRecipes);
				displayDropdownContent(filteredRecipes);
			}
		});
	});
};

const displayRecipeData = () => {
	displayRecipesElements(recipes);
	displayRecipesamount(recipes);
	displayDropdownContent(recipes);

	toggleDropdown();
	toggleTags();

	mainSearch();
	keywordsSearch();
};
displayRecipeData();
