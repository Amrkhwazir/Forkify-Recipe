const searchBar = document.getElementById('searchBar');
const searchBtn = document.getElementById('searchBtn');
const recipeImg = document.querySelector('.recipeImg');
const title = document.querySelector('.title');
const publisher = document.querySelector('.publisher');
const recipeItemList = document.querySelector('.recipeItemList');
const productIngredients = document.querySelector('.singleItemBox');
const reciepeIngredients = document.querySelector('.reciepeIngredients');
// console.log(reciepeIngredients.innerHTML);
const ingreidentImage = document.getElementById('singleItemImage');





// searching data in Api
function recipeFindHandler(userInput){

    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${userInput}`)
    .then((response)=>{
        // console.log(response)
        return response.json()
    }).then((data)=>{
        // console.log(data)
        return uiCreation(data)
    })
    
}

// show search data on display

function uiCreation(recipesData){
    // console.log(recipesData)

    const recipeDataMapping = recipesData.data.recipes.map((items) => {

        const recipeListElm = `<div class="reciepeList d-flex">
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

    const productElm = `<div class="ingredient">
      <div class="imageBox">
        <img class="img-fluid card-img-top image-fit" src=${productObj.image_url} id="singleItemImage" alt="">
      </div>
      <div class="ingredientTitle">
        <h1 id="dishName">${productObj.title}</h1>
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

        </div>  <div class="reciepeIngredients">
          <h3>Recipe Ingredients</h3>
          <div class="item">
          ${iterateProduct(productObj.ingredients)}
          </div>
      </div>
      
<div class="card mb-3" style="background-color: whitesmoke; border: none;">
<div class="card-body">
    <h4 class="card-title text-center my-4 howToCook">How To Cook It</h4>
    <p class="card-text text-center">
        The source URL for the recipe is: 
        </br>
        <a href=${productObj.source_url} > ${productObj.source_url}</a>.
    </p>
    
</div>
</div>`;

productIngredients.innerHTML = productElm;
}

function iterateProduct(ingredient){

  // console.log(ingredient)

  const mappedItem = ingredient.map((items)=>{
    
    const ingredientList = `<div class="items d-flex gap-2 align-items-baseline p-2">
    <i class="fa-solid fa-check me-2"></i>
    <p class="text-break">${items.quantity} ${items.unit} ${items.description}</p>
</div>`
   return ingredientList
})

// console.log(mappedItem.join())
return mappedItem.join()

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
    productIngredients.innerHTML = ""

}

searchBtn.addEventListener('click', searchitem)