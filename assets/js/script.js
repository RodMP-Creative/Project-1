// Get the form and the container where the recipe cards will be displayed.
const form = document.getElementById('recipeForm');
const recipeCardsContainer = document.getElementById('recipeCards');
const searchInput = document.getElementById('searchInput');

document.addEventListener('DOMContentLoaded', () => {
    // Get the modal and the buttons that open and close it.
    const modalBtn = document.getElementById('modalBtn');
    const recipeModal = document.getElementById('recipeModal');
    const cancelBtn = document.getElementById('cancelBtn');

    // Toggles the modal when the button is clicked.
    modalBtn.addEventListener('click', () => {
        recipeModal.classList.toggle('hidden');
    });
    cancelBtn.addEventListener('click', () => {
        recipeModal.classList.toggle('hidden');
    });

    // Waits for submit button in order to run "saveRecipe" function and dave input values.
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        saveRecipe();
        recipeModal.classList.toggle('hidden');
    });

    // Function to delete recipe from local storage.
    window.deleteRecipe = function (id) {
        let recipes = getRecipes();
        recipes = recipes.filter(recipe => recipe.id !== id);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
    }

    // Display recipes when the page loads
    displayRecipes();
});

// Function to display recipes in the DOM
function displayRecipes(filteredRecipes) {
    recipeCardsContainer.innerHTML = '';
    let recipes = filteredRecipes ? filteredRecipes : getRecipes();

    recipes.forEach(recipe => {
        const card = document.createElement('article');
        card.classList.add('recipeCards');
        card.innerHTML =
            `<h2 class="recipeTitle self-center text-xl mb-4">${recipe.title}</h2>
            <div>
                <p class="recipeDescription">${recipe.description}</p>
                <p class="recipeTitle">Ingredients</p>
                <ol class="recipeIngredients">
                ${recipe.ingredients.split(',').map(ingredient => `<li class="ingredientList">${ingredient.trim()}</li>`).join('')}
                </ol>
                <p class="recipeTitle">Steps</p>
                <p class="recipeDescription">${recipe.instructions}</p>
                <button onclick="deleteRecipe(${recipe.id})" class="button m-2 align absolute">Delete</button>
            </div>`;
        recipeCardsContainer.appendChild(card);
    });
}

// Function to save recipe in local storage
function saveRecipe() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;

    // Check if any fields are empty
    if (!title || !description || !ingredients || !instructions) {
        alert('Please fill out all sections.');
        return;
    }

    // Object  that will be saved in local storage with unique id
    const recipe = {
        id: Date.now(),
        title,
        description,
        ingredients,
        instructions
    };

    // Load recipes from local storage and turn them into an array.
    let recipes = getRecipes();
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes();
    form.reset();
}

function filterRecipes() {
    const input = document.getElementById('searchInput');
    const value = input.value;
    if (value === '') {
        displayRecipes();
        return;
    }

    let recipes = getRecipes();
    let filteredRecipe = recipes.filter(recipe => recipe.title.toLowerCase().includes(value.toLowerCase()));

    displayRecipes(filteredRecipe);
}

// Function to get recipes from local storage
function getRecipes() {
    const recipes = localStorage.getItem('recipes');
    if (!recipes) {
        const noContentEl = document.createElement('p');
        noContentEl.textContent = 'No recipes found!';
        recipeCardsContainer.appendChild(noContentEl);
    }
    return recipes ? JSON.parse(recipes) : [];
}

function onInput() {
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm === '') {
            displayRecipes();
        }
    });
}

displayRecipes();
onInput();