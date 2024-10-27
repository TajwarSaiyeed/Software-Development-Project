const search = document.querySelector(".form-control");
const searchBtn = document.getElementById("button-search");
const foods = document.getElementById("foods");
const details = document.getElementById("details");

searchBtn.addEventListener("click", () => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search.value}`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.meals) {
        foods.classList.add("d-flex", "flex-wrap", "gap-4");
        foods.innerHTML = "";
        const noResult = document.createElement("div");
        noResult.classList.add("alert", "alert-danger", "w-100");
        noResult.innerText = "No result found";
        foods.appendChild(noResult);
      } else {
        foods.classList.add("d-flex", "flex-wrap", "gap-4");
        foods.innerHTML = "";
        data.meals.forEach((meal) => {
          const mealCard = document.createElement("div");
          mealCard.classList.add("mb-4", "card");

          const { strMeal, strMealThumb } = meal;

          mealCard.innerHTML = `
          <div style="width: 18rem;" onclick="handleDetails(${meal.idMeal})">
              <div class='w-100 bg-black'>
                <img src="${
                  strMealThumb || "def.png"
                }" class="card-img-top" alt="Meal Image">
              </div>
              <div class="card-body">
                  <h5 class="card-title text-center">${strMeal}</h5>
              </div>
          </div>`;
          foods.appendChild(mealCard);
        });
      }
    });
});

const handleDetails = (id) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((data) => {
      const { meals } = data;
      const meal = meals[0];
      const mealDetails = document.createElement("div");
      mealDetails.classList.add("card", "w-50", "mb-4");
      mealDetails.innerHTML = `
      <img src="${
        meal.strMealThumb
      }" style="height: 200px;" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 200)}...</p>
      </div>
      <ul class="list-group list-group-flush">
        ${[...Array(20).keys()]
          .map((i) =>
            meal[`strIngredient${i + 1}`]
              ? `<li class="list-group-item">${
                  meal[`strIngredient${i + 1}`]
                }</li>`
              : ""
          )
          .join("")}
      </ul>
      <div class="card-body">
        <a href="${meal.strYoutube}" class="card-link">Watch on Youtube</a>
      </div>`;
      details.prepend(mealDetails);
    });
};
