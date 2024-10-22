// Get the form and the container where the recipe cards will be displayed.
const form = document.getElementById('recipeForm');
const recipeCardsContainer = document.getElementById('recipeCards');
let editMode = false;
let editId = null;

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
        if (editMode) {
            updateRecipe(editId);
            alert("Recipe updated");
        } else {
        saveRecipe();
        alert("Recipe saved");
        }
        recipeModal.classList.toggle('hidden');
        
    });

    // Function to delete recipe from local storage.
    window.deleteRecipe = function (id) {
        let confirmDelete = confirm("Do you want to delete the recipe?")
        if (confirmDelete){
        let recipes = getRecipes();
        recipes = recipes.filter(recipe => recipe.id !== id);
        localStorage.setItem('recipes', JSON.stringify(recipes));
            
        alert("Recipe deleted")
        } 
        else{
            alert("Delete canceled")
        }
        displayRecipes();
        
    };

    //Function to edit a recipe
    window.editRecipe = function (id){
        const recipes = getRecipes();
        const recipe = recipes.find(recipe => recipe.id ===id);

        if (recipe) {
            document.getElementById('title').value = recipe.title;
            document.getElementById('description').value = recipe.description;
            document.getElementById('ingredients').value = recipe.ingredients;
            document.getElementById('instructions').value = recipe.instructions;

            editMode = true;
            editId = id;

            document.getElementById('recipeModal').classList.toggle('hidden');
           
        }
        
    };

    // Function to update a recipe
    function updateRecipe(id) {
        let recipes = getRecipes();
        recipes = recipes.map(recipe => {
            if (recipe.id === id) {
                return {
                    id,
                    title: document.getElementById('title').value,
                    description: document.getElementById('description').value,
                    ingredients: document.getElementById('ingredients').value,
                    instructions: document.getElementById('instructions').value,
                };
            }
            return recipe;
        });

        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
    
        
        editMode = false;
        editId = null;
    }
    // Display recipes when the page loads
    displayRecipes();
});

// Function to display recipes in the DOM
function displayRecipes(filteredRecipes) {
    recipeCardsContainer.innerHTML = '';
    let recipes = filteredRecipes ? filteredRecipes : getRecipes();

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
                <button onclick="deleteRecipe(${recipe.id})" class="button">Delete</button>
                <button onclick="editRecipe(${recipe.id})" class="editbutton">Edit</button>
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
    // TODO: Call display recipes without filter when the input is empty

    var input = document.getElementById('searchInput');

    // Obtiene el valor del input
    var value = input.value;

   //Shows an alert if search is empty
    if (value === "") {
        alert("Search is empty");
        displayRecipes();
        return;
    }

    // Muestra el valor en la consola o úsalo como prefieras
    console.log(value);
    let recipes = getRecipes();
    console.log('recipes', recipes);
    if (recipes.length == 0) {
        alert('No recipes found');
        return;
    }

    let filteredRecipe = recipes.filter(recipe => recipe.title.toLowerCase().includes(value.toLowerCase()));
    console.log('filteredRecipe', filteredRecipe);
    displayRecipes(filteredRecipe);
}

function resetRecipes() {
    console.log('reset', recipes);
}

// Function to get recipes from local storage
function getRecipes() {
    const recipes = localStorage.getItem('recipes');
    return recipes ? JSON.parse(recipes) : [];
}
