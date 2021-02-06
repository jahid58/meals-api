const searchItem = document.getElementById('food-input');
const searchBtn = document.getElementById('search-btn');
const ingredientBox =document.getElementById('ingredient')
const foodList = document.getElementById('food-list');

//displaying ingredient 
const foodsIngredient =(mealName)=>{
    ingredientBox.style.display = 'block'
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+mealName)
    .then(res =>res.json())
    .then(ingredient =>{
     let mealsIngredient =ingredient.meals[0]
     ingredientBox.innerHTML =`<img src="${mealsIngredient.strMealThumb}" class="img-fluid" alt="">
     <h5 class="food-names">${mealName}</h5>
     <h5>Ingredients</h5>
     <ul><li>${mealsIngredient.strIngredient1}</li>
     <li>${mealsIngredient.strIngredient2}</li>
     <li>${mealsIngredient.strIngredient3}</li>
     <li>${mealsIngredient.strIngredient4}</li>
     <li>${mealsIngredient.strIngredient5}</li>
     <li>${mealsIngredient.strIngredient6}</li></ul>`
    } )      
}

//displaying foods template
const displayFoods = (foods) =>{
    foodList.innerHTML='';
    ingredientBox.style.display = 'none'

    let allFood = foods.meals;
    if (allFood == null) {
        foodList.innerHTML =`   <h3> No result found for ${searchItem.value}</h3>`
    } else {
        allFood.forEach(food => {
        let {strMeal} = food;
        let {strMealThumb} = food;
        let foodPlate = document.createElement('div')

        foodPlate.id ='food-plate';  
        foodPlate.innerHTML = `<img src="${strMealThumb}" class="foods-img img-fluid" alt="">
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




