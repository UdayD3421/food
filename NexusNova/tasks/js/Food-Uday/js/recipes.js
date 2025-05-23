const recipeContainer = document.getElementById("recipe-cards");
const filterButtons = document.querySelectorAll("#filters button");
const recipeDetails = document.getElementById("recipe-details");
const form = document.getElementById("recipe-form");

let allRecipes = [];

// Fetch recipes
// Fetch and flatten recipes from nested JSON
fetch("./js/recipes.json")
  .then(res => res.json())
  .then(data => {
    const flatRecipes = [];

    for (const category in data.recipes) {
      data.recipes[category].forEach(recipe => {
        flatRecipes.push({
          ...recipe,
          category: capitalize(category),
          image: recipe.img || recipe.image, // handle both img or image keys
          ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients.join(", ") : recipe.ingredients
        });
      });
    }

    const localRecipes = JSON.parse(localStorage.getItem("customRecipes")) || [];
    allRecipes = [...flatRecipes, ...localRecipes];
    displayRecipes(allRecipes);
  });

function capitalize(text) {
  return text.replace(/(^|-)([a-z])/g, (_, sep, char) => sep + char.toUpperCase());
}


// Display Recipe Cards
// Load favorites from localStorage
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function addToFavorites(recipe) {
  if (!favorites.find(fav => fav.name === recipe.name)) {
    favorites.push(recipe);
    saveFavorites();
    alert(`${recipe.name} added to favorites!`);
  } else {
    alert(`${recipe.name} is already in favorites.`);
  }
}

function displayRecipes(recipes) {
  recipeContainer.innerHTML = "";
  recipes.map(recipe => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}">
      <div class="content">
        <h3>${recipe.name}</h3>
        <p><strong>Region:</strong> ${recipe.region}</p>
        <div class="buttons">
          <button onclick='viewRecipe(${JSON.stringify(recipe)})'>View Recipe</button>
          <button onclick='addToFavorites(${JSON.stringify(recipe)})'>Favorite</button>
        </div>
      </div>
    `;
    recipeContainer.appendChild(card);
  });
}

function displayFavorites() {
  const favoritesContainer = document.getElementById("favoritesContainer");
  favoritesContainer.innerHTML = "";
  if (favorites.length === 0) {
    favoritesContainer.innerHTML = "<p>No favorite recipes yet.</p>";
    return;
  }

  favorites.map(recipe => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${recipe.image}" class="fav-img" alt="${recipe.name}">
      <div class="content">
        <h3 style="text-align:left">${recipe.name}</h3>
        <p><strong>Region:</strong> ${recipe.region}</p>
        <div class="buttons" style="width:100px">
          <button onclick='viewRecipe(${JSON.stringify(recipe)})'>View Recipe</button>
        </div>
      </div>
    `;
    favoritesContainer.appendChild(card);
  });
}


// Filter Recipes
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    const category = button.dataset.category;
    const filtered = category === "All" ? allRecipes : allRecipes.filter(r => r.category === category);
    displayRecipes(filtered);
  });
});

// View Detailed Recipe
function viewRecipe(recipe) {
    recipeDetails.classList.remove("hidden");
    recipeDetails.scrollIntoView({ behavior: "smooth" });
  
    recipeDetails.innerHTML = `
      <h2>${recipe.name}</h2>
      <p><strong>Region:</strong> ${recipe.region || "N/A"}</p>
      <h3>Ingredients</h3>
      <ul>${(recipe.ingredients || "").split(",").map(i => `<li>${i.trim()}</li>`).join("")}</ul>
      <h3>Preparation Steps</h3>
      <ol>${(recipe.steps || "").split(".").map(s => s.trim() && `<li>${s}</li>`).join("")}</ol>
      <h3>Cultural Significance</h3>
      <p>${recipe.culture || "Not provided."}</p>
    `;
  }
  

// Add Your Own Recipe
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newRecipe = {
    name: form.name.value,
    region: form.region.value,
    category: form.category.value,
    image: form.image.value,
    ingredients: form.ingredients.value,
    steps: form.steps.value,
    culture: form.culture.value,
  };

  // Validation
  if (Object.values(newRecipe).some(val => !val.trim())) {
    alert("Please fill all fields.");
    return;
  }

  const customRecipes = JSON.parse(localStorage.getItem("customRecipes")) || [];
  customRecipes.push(newRecipe);
  localStorage.setItem("customRecipes", JSON.stringify(customRecipes));

  allRecipes.push(newRecipe);
  displayRecipes(allRecipes);
  form.reset();
});

function showFavorites() {
  recipeContainer.style.display = "none";
  favoritesContainer.style.display = "grid";
  displayFavorites();
}
