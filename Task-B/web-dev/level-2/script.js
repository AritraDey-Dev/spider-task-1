// Sample predefined recipes (for demonstration)
let recipes = [
    {
        id: 1,
        name: "Pasta with Tomato Sauce",
        image: "images/pasta.jpg",
        ingredients: ["pasta", "tomato sauce", "garlic", "olive oil"],
        procedure: "Boil pasta. Heat olive oil, sauté garlic. Add tomato sauce. Mix with pasta.",
        cuisine: "Italian",
        prepTime: 30,
        dietaryRestrictions: []
    },
    {
        id: 2,
        name: "Vegetable Stir Fry",
        image: "images/stir-fry.jpg",
        ingredients: ["vegetables", "soy sauce", "ginger", "garlic", "sesame oil"],
        procedure: "Stir fry vegetables with soy sauce, ginger, and garlic. Drizzle with sesame oil.",
        cuisine: "Chinese",
        prepTime: 20,
        dietaryRestrictions: []
    }
];

// Function to display ingredients
function displayIngredients() {
    const form = document.getElementById('ingredientForm');
    const ingredientForm = document.createElement('div');

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = ingredient;
            input.name = 'ingredients';
            input.value = ingredient;

            const label = document.createElement('label');
            label.htmlFor = ingredient;
            label.textContent = ingredient;

            ingredientForm.appendChild(input);
            ingredientForm.appendChild(label);
            ingredientForm.appendChild(document.createElement('br'));
        });
    });

    form.appendChild(ingredientForm);
}

// Function to find recipes based on selected ingredients and filters
function findRecipes(event) {
    event.preventDefault();
    
    const selectedIngredients = Array.from(document.querySelectorAll('input[name="ingredients"]:checked'))
        .map(checkbox => checkbox.value);

    const cuisineFilter = document.getElementById('cuisine').value;
    const prepTimeFilter = parseInt(document.getElementById('prepTime').value, 10);
    const dietFilter = document.getElementById('diet').value.toLowerCase();

    const matchingRecipes = recipes.filter(recipe =>
        selectedIngredients.every(ingredient => recipe.ingredients.includes(ingredient)) &&
        (cuisineFilter === "" || recipe.cuisine === cuisineFilter) &&
        (isNaN(prepTimeFilter) || recipe.prepTime <= prepTimeFilter) &&
        (dietFilter === "" || recipe.dietaryRestrictions.includes(dietFilter))
    );

    displayRecipes(matchingRecipes);
}

// Function to display recipes
function displayRecipes(recipes) {
    const recipeResults = document.getElementById('recipeResults');
    recipeResults.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        const recipeImage = document.createElement('img');
        recipeImage.src = recipe.image;
        recipeImage.alt = recipe.name;
        recipeDiv.appendChild(recipeImage);

        const recipeTitle = document.createElement('h3');
        recipeTitle.textContent = recipe.name;
        recipeDiv.appendChild(recipeTitle);

        const ingredientsList = document.createElement('ul');
        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            ingredientsList.appendChild(li);
        });
        recipeDiv.appendChild(ingredientsList);

        const procedure = document.createElement('p');
        procedure.textContent = "Cooking Procedure: " + recipe.procedure;
        recipeDiv.appendChild(procedure);

        // Button to save recipe
        const saveButton = document.createElement('button');
        saveButton.textContent = "Save Recipe";
        saveButton.addEventListener('click', () => saveRecipe(recipe));
        recipeDiv.appendChild(saveButton);

        recipeResults.appendChild(recipeDiv);
    });
}

// Function to save recipe to local storage
function saveRecipe(recipe) {
    let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    savedRecipes.push(recipe);
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    displaySavedRecipes();
}

// Function to display saved recipes
function displaySavedRecipes() {
    const savedRecipesDiv = document.getElementById('savedRecipes');
    savedRecipesDiv.innerHTML = '';

    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];

    savedRecipes.forEach(savedRecipe => {
        const savedRecipeDiv = document.createElement('div');
        savedRecipeDiv.classList.add('recipe');

        const recipeImage = document.createElement('img');
        recipeImage.src = savedRecipe.image;
        recipeImage.alt = savedRecipe.name;
        savedRecipeDiv.appendChild(recipeImage);

        const recipeTitle = document.createElement('h3');
        recipeTitle.textContent = savedRecipe.name;
        savedRecipeDiv.appendChild(recipeTitle);

        const ingredientsList = document.createElement('ul');
        savedRecipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            ingredientsList.appendChild(li);
        });
        savedRecipeDiv.appendChild(ingredientsList);

        const procedure = document.createElement('p');
        procedure.textContent = "Cooking Procedure: " + savedRecipe.procedure;
        savedRecipeDiv.appendChild(procedure);

        savedRecipesDiv.appendChild(savedRecipeDiv);
    });
}

// Event listener for form submission
document.getElementById('ingredientForm').addEventListener('submit', findRecipes);

// Event listener for applying filters
document.getElementById('applyFilters').addEventListener('click', findRecipes);

// Display initial ingredients and saved recipes
displayIngredients();
displaySavedRecipes();
