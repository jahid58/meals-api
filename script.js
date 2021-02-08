const searchItem = document.getElementById('food-input');
const searchBtn = document.getElementById('search-btn');
const foodList = document.getElementById('food-list');
const mealImg = document.getElementById('meal-img');
const dishName = document.getElementById('name');
const ingredientBox = document.getElementById('meal-details');
const ingredientUl = document.getElementById('ingredients');
const measureUl = document.getElementById('measure')

//fetching api for meals
const displayFoodList =()=>{  
    foodList.innerHTML='';
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+searchItem.value)
    .then(res=>res.json())
    .then(meals=>displayFoods(meals))
}

searchBtn.addEventListener('click',displayFoodList);

//displaying foods template
const displayFoods = (foods) =>{
    ingredientBox.style.display = 'none';

    let allFood = foods.meals;
    if (allFood == null || searchItem.value == '' ) {
        foodList.innerHTML = `   <h2> No result found for ${searchItem.value}</h2>`
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

//displaying ingredient function
const foodsIngredient =(mealName)=>{
    ingredientBox.style.display = 'block'
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+mealName)
    .then(res =>res.json())
    .then(ingredients =>{
     let mealsIngredient =ingredients.meals[0];
     ingredientUl.innerHTML='';
     measureUl.innerHTML= '';
     dishName.innerHTML =`<h4>  ${mealsIngredient.strMeal}</h4>`

//access object key and property
     for (const [key, value] of Object.entries(mealsIngredient)) {   
     mealImg.src =`${mealsIngredient.strMealThumb}`
     const ingredient = document.createElement('li');
     const measure = document.createElement('li');
     let keyLetter = key.slice(0,10);
     if(keyLetter =="strIngredi"){
         ingredient.innerText =value;
         ingredientUl.appendChild(ingredient);
        }
     if(keyLetter =="strMeasure"){     
         measure.innerText= value;
         measureUl.appendChild(measure);
        }
       }
   })   
}          








