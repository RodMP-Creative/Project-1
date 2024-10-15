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
