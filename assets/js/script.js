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
    
    // Get the form and the container where the recipe cards will be displayed.
    const form = document.getElementById('recipeForm');
    const recipeCardsContainer = document.getElementById('recipeCards');

    // Waits for submit button in order to run "saveRecipe" function and dave input values.
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        saveRecipe();
        recipeModal.classList.toggle('hidden');
    });

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
        let recipes = loadRecipes();
        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
        form.reset();
    }

    // Function to load recipes from local storage
    function loadRecipes() {
        const recipes = localStorage.getItem('recipes');
        return recipes ? JSON.parse(recipes) : [];
    }

    // Function to display recipes in the DOM
    function displayRecipes() {
        recipeCardsContainer.innerHTML = '';
        const recipes = loadRecipes();

        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.classList.add('recipeCards');
            card.innerHTML = 
                           
                `<h2 class="recipeTitle">${recipe.title}</h2>
                <div>
                    <p class="recipeDescription">${recipe.description}</p>
                    <p class="recipeSubtitle">Ingredients</p>
                    <ul class="recipeIngredients">
                    ${recipe.ingredients.split(',').map(ingredient => `<li class="ingredientList">${ingredient.trim()}</li>`).join('')}
                    </ul>
                    <p class="recipeSubtitle">Steps</p>
                    <p class="recipeSteps">${recipe.instructions}</p>
                    <button onclick="deleteRecipe(${recipe.id})">Delete</button>
                </div>`;
            recipeCardsContainer.appendChild(card);
        });
    }

    // Function to delete recipe from local storage.
    window.deleteRecipe = function (id) {
        let recipes = loadRecipes();
        recipes = recipes.filter(recipe => recipe.id !== id);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
    }

    // Display recipes when the page loads
    displayRecipes();
});

let recipes = ['arroz con leche', 'pan de platano', 'pan frances'];

function getInputValue() {
  var input = document.getElementById('searchInput');

  // Obtiene el valor del input
  var value = input.value;

  // Muestra el valor en la consola o úsalo como prefieras
  console.log(value);
  let filteredRecipe = recipes.filter(val => val.includes(value))

  console.log('filtro', filteredRecipe);
}

function resetRecipes() {
  console.log('reset', recipes);
}
