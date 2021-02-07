const searchItem = document.getElementById('food-input');
const searchBtn = document.getElementById('search-btn');
const ingredientBox = document.getElementById('ingredient');
const foodList = document.getElementById('food-list');

//displaying ingredient 
const foodsIngredient =(mealName)=>{
    ingredientBox.innerText = ''
    ingredientBox.style.display = 'block'
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+mealName)
    .then(res =>res.json())
    .then(ingredients =>{
     let mealsIngredient =ingredients.meals[0];
     ingredientBox.innerHTML =`<img src="${mealsIngredient.strMealThumb}" class="img-fluid" alt="">
     <h3 class="food-names">${mealName}</h3>
     <h4> Ingredients</h4>
     <ul>
     <li>${mealsIngredient.strIngredient1} ${mealsIngredient.strMeasure1}</li>
     <li>${mealsIngredient.strIngredient2} ${mealsIngredient.strMeasure2}</li>
     <li>${mealsIngredient.strIngredient3} ${mealsIngredient.strMeasure3}</li>
     <li>${mealsIngredient.strIngredient4} ${mealsIngredient.strMeasure4}</li>
     <li>${mealsIngredient.strIngredient5} ${mealsIngredient.strMeasure5}</li>
     <li>${mealsIngredient.strIngredient6} ${mealsIngredient.strMeasure6}</li>
     <li>${mealsIngredient.strIngredient3} ${mealsIngredient.strMeasure7}</li>
     <li>${mealsIngredient.strIngredient4} ${mealsIngredient.strMeasure8}</li>
     <li>${mealsIngredient.strIngredient5} ${mealsIngredient.strMeasure9}</li>
     <li>${mealsIngredient.strIngredient6} ${mealsIngredient.strMeasure10}</li>
     
     </ul>`
    })      
}

//displaying foods template
const displayFoods = (foods) =>{
    ingredientBox.style.display = 'none';

    let allFood = foods.meals;
    if (allFood == null) {
        foodList.innerHTML =`   <h2> No result found for ${searchItem.value}</h2>`
    } else {
        allFood.forEach(food => {
        let {strMeal} = food;
        let {strMealThumb} = food;
        let foodPlate = document.createElement('div')

        foodPlate.id ='food-plate';  
        foodPlate.innerHTML = `<img src="${strMealThumb}" class="img-fluid" alt="">
        <h3 class="food-names">${strMeal}</h3>`
        foodList.appendChild(foodPlate); 
        
        foodPlate.addEventListener('click',()=>foodsIngredient(strMeal))
    });
    }
}

//fetching api for meals
const displayFoodList =()=>{  
    foodList.innerHTML='';
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+searchItem.value)
    .then(res=>res.json())
    .then(meals=>displayFoods(meals))
}

searchBtn.addEventListener('click',displayFoodList);




