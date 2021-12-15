const generateButton = document.querySelector('.interact__button');
const LoaderHTML = `<div style="display:grid;place-content:center;">
  <div style="width:100px;height:100px;animation-duration: 1s;
  animation-name: loader;
  animation-iteration-count: infinite; background-color:#199577;border-radius:100%;">
  </div>
</div>`;
const recipeContainer = document.querySelector('.recipe');
const mainContainer = document.querySelector('.main');
const appTitle = document.querySelector('.interact__title');

const filterProperties = (object) => {
  return (regex) => {
    return Object.fromEntries(
      Object.entries(object).filter(([key, value]) => regex.test(key) && value)
    );
  };
};

const recipeHTMLBuilder = (recipe) => {
  const ingredientFilter = filterProperties(recipe);
  const ingredientNames = Object.values(ingredientFilter(/strIngredient*./));
  const ingredientQuantity = Object.values(ingredientFilter(/strMeasure.*/));
  const ingredients = Object.fromEntries(
    ingredientNames.map((ing, index) => [ing, ingredientQuantity[index]])
  );
  return `
  <section class="recipe__details">
    <h1 class="recipe__name">${recipe.strMeal}</h1>
    <img src="${
      recipe.strMealThumb
    }" alt="Photo Of Recipe" class="recipe__photo" />
    <div class="recipe__attributes">
      <div class="recipe__attribute">
        <span class="attribute_name">Category:</span>
        <span class="attribute_value">${recipe.strCategory}</span>
      </div>
      <div class="recipe__attribute">
        <span class="attribute_name">Area:</span>
        <span class="attribute_value">${recipe.strArea}</span>
      </div>
      <div class="recipe__attribute">
        <span class="attribute_name">Tags:</span>
        <span class="attribute_value">${recipe.strTags || '-'}</span>
      </div>
    </div>
  </section>
  <section class="recipe__ingredients">
    <h2 class="recipe__subtitles">Ingredients</h2>
    <ul class="ingredients">
      ${Object.keys(ingredients)
        .map((key) => {
          return `<li>${key} - ${ingredients[key]}</li>`;
        })
        .join('')}
    </ul>
  </section>
  <section class="recipe__recipe">
    <h2 class="recipe__subtitles">Recipe</h2>
    <p class="instructions">
      ${recipe.strInstructions}
    </p>
  </section>
  <section class="recipe__video">
    <h2 class="recipe__subtitles">Video Recipe</h2>
    <iframe title="Recipe video on youtube" src="https://www.youtube.com/embed/${
      recipe.strYoutube.split('?v=')[1]
    }"></iframe>
  </section>
  `;
};

const getRandomRecipe = async (e) => {
  recipeContainer.innerHTML = '';
  recipeContainer.style.height = '80vh';
  recipeContainer.innerHTML = LoaderHTML;
  appTitle.textContent = 'Still Feeling Hungry?';
  mainContainer.style.setProperty('--interact-title-size', '2.3rem');
  mainContainer.style.setProperty('--interact-button-size', '1rem');
  const data = (
    await (
      await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    ).json()
  ).meals[0];
  console.log(data);
  recipeContainer.innerHTML = await recipeHTMLBuilder(data);
};

generateButton.addEventListener('click', getRandomRecipe);

// window.addEventListener('load', () => {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker
//       .register('/sw.js', { scope: './' })
//       .then(function () {
//         console.log('ServiceWorker succesfully registered');
//       })
//       .catch(function (err) {
//         console.log('ServiceWorker registration failed: ', err);
//       });
//   } else {
//     console.log('Service workers are not supported.');
//   }
// });
