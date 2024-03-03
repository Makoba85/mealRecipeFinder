// // declaration and initialization of constant variables

// const searchButton = document.getElementById('search-btn');
// const mealList = document.getElementById('meal');
// const mealDetailsContent = document.querySelector('.meal-details-content')
// const recipeCloseButton = document.getElementById('recipe-close-btn')

// // addition of event listeners
// searchButton.addEventListener('click', getMealList)

// // matching of meal list with ingredients
// function getMealList(){
//     let searchInputText = document.getElementById('search-input').value.trim();
//     fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data)
//     })
// }


// declaration and initialization of constant variables

const searchButton = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content')
const recipeCloseButton = document.getElementById('recipe-close-btn')

// addition of event listeners
searchButton.addEventListener('click', getMealList)
mealList.addEventListener('click',getRecipe)
recipeCloseButton.addEventListener('click', ()=>{
    mealDetailsContent.parentElement.classList.remove('showRecipe')
})

// matching of meal list with ingredients
function getMealList(){
    let searchInputText = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let html = ""
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                <div class="meal-item" data-id = "${meal.idMeal}">
                <div class="meal-img">
                    <img src="${meal.strMealThumb}" alt="food item here">
                </div>
                <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href="#" class="recipe-btn">Get Recipe</a>
                </div>
            </div>
                `;
            });
            mealList.classList.remove('.notFound')
        }
        else{
            html = "Sorry no match was found for your request";
            mealList.classList.add('notFound')
        }

        mealList.innerHTML = html;
    });
}
 

function getRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals))
    }
}

function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
            <h2 class="recipe-title">${meal.strMeal}</h2>
            <p class="recipe-category">${meal.strCategory}</p>
            <div class="recipe-instruct">
                <h3>Instructions: </h3>
                    <p>${meal.strInstructions}</p>
            </div>
            <div class="recipe-meal-img">
                <img src="${meal.strMealThumb}" alt="recipe meal image">
            </div>
                <div class="recipe-link">
                    <a href="${meal.strYoutube}" target="_blank">Watch Recipe Video</a>
                </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe')
}