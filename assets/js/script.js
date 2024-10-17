document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('recipeForm');
    const recipeCardsContainer = document.getElementById('recipeCards');

    // Waits for submit button in order toi run "saveRecipe" function and dave input values.
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        saveRecipe();
    });

    // Function to save recipe in local storage
    function saveRecipe() {
        const title = document.getElementById('title').value;
        const ingredients = document.getElementById('ingredients').value;
        const instructions = document.getElementById('instructions').value;

        // Object  that will be saved in local storage with unique id
        const recipe = {
            id: Date.now(),
            title,
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

    function loadRecipes() {
        const recipes = localStorage.getItem('recipes');
        return recipes ? JSON.parse(recipes) : [];
    }

    function displayRecipes() {
        recipeCardsContainer.innerHTML = '';
        const recipes = loadRecipes();

        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.classList.add('recipe-card');
            card.innerHTML = `
                <h2>${recipe.title}</h2>
                <p>Ingredients: ${recipe.ingredients}</p>
                <p>Instructions: ${recipe.instructions}</p>
                <button onclick="deleteRecipe(${recipe.id})">Delete</button>
            `;
            recipeCardsContainer.appendChild(card);
        });
    }

    window.deleteRecipe = function (id) {
        let recipes = loadRecipes();
        recipes = recipes.filter(recipe => recipe.id !== id);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
    }

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
