const searchBar = document.getElementById('searchBar');
const searchBtn = document.getElementById('searchBtn');
const recipeImg = document.querySelector('.recipeImg');
const title = document.querySelector('.title');
const publisher = document.querySelector('.publisher');
const recipeItemList = document.querySelector('.recipeItemList');
const productIngredients = document.querySelector('.singleItemBox');
const reciepeIngredients = document.querySelector('.reciepeIngredients');
const ingreidentImage = document.getElementById('singleItemImage');





// searching data in Api
function recipeFindHandler(userInput){

    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${userInput}`)
    .then((response)=>{
        console.log(response)
        return response.json()
    }).then((data)=>{
        console.log(data)
        return uiCreation(data)
    })
    
}

// show search data on display

function uiCreation(recipesData){
    console.log(recipesData)

    const recipeDataMapping = recipesData.data.recipes.map((items) => {

        const recipeListElm = ` <div class="reciepeList d-flex">
        <img src="${items.image_url}" class="recipeImg" alt="">
        <div class="detail">
        <p class="title" onclick="getRecipeData('${items.id}')">${items.title}</p>
        <p class="publisher">${items.publisher}</p>
    </div>
    </div>` 
    return recipeListElm    
    })

    recipeItemList.innerHTML = recipeDataMapping;
}

function singleIngredientHandler(ingredientData){
    console.log(ingredientData)
    const productObj = ingredientData.data.recipe

    const productElm = `
    <div class="ingredient">
      <div class="imageBox">
        <img class="img-fluid card-img-top image-fit" src=${productObj.image_url} id="singleItemImage" alt="">
      </div>
      <div class="ingredientTitle">
        <h1 id="dishName">${productObj.publisher}</h1>
      </div>
      
      <!-- seervice -->
      <div class="ingredientDetailBox">
        <div class="serviceDuration d-flex justify-content-center gap-5">
          <div class="time d-flex gap-2 mt-1">
            <i class="fa-regular fa-clock mt-1"></i>
            <p>${productObj.cooking_time}minutes</p>
          </div>
          <div class="service d-flex gap-2 mt-1">
            <i class="fa-solid fa-user-group mt-1"></i>
            <p>${productObj.servings} serving</p>
          </div>
          <div class="btn">
          <i class="fa-solid fa-circle-plus mx-2"></i>
          <i class="fa-solid fa-circle-minus"></i>
        </div>
        </div>
`
const mappedItem = productObj.ingredients.map((items)=>{
    
    const ingredientList = `<div class="items">
    <p>${items.quantity} ${items.unit} ${items.description}</p>
   </div>` 
   return ingredientList
})

// console.log(mappedItem)

productIngredients.innerHTML = productElm

}

function getRecipeData(id){
    // console.log(id)
    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
    .then((resp)=>{
        console.log(resp)
        if(!resp.ok === true ){
            throw new Error('the data is undefined')
        }
        return resp.json()
    }).then((info)=>{
        console.log(info)
        return singleIngredientHandler(info)
    }).catch((err)=>{
        console.error(err, "data is undefined");
    })
}

// searchItem

function searchitem(){
    const searchBarData = searchBar.value
    recipeFindHandler(searchBarData)
    // console.log(searchBarData)
    searchBar.value = "";

}

searchBtn.addEventListener('click', searchitem)