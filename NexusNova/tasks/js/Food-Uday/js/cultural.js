//food and festivals
async function loadFestivalFoods() {
    try {
      const response = await fetch("./js/festivals.json");
      const data = await response.json();
      const festivalContainer = document.getElementById("festival-cards");
  
      // Loop through each category
      Object.values(data.recipes).forEach(category => {
        category.forEach(item => {
          if (item.festival) {
            const card = document.createElement("div");
            card.className = "card";
  
            card.innerHTML = `
              <img src="${item.img}" alt="${item.name}">
              <h3>${item.name}</h3>
              <p>${item.festival}</p>
            `;
  
            festivalContainer.appendChild(card);
          }
        });
      });
  
    } catch (error) {
      console.error("Failed to load festival foods:", error);
    }
  }
  
  window.addEventListener("load", loadFestivalFoods);
  
  
  //history
  async function loadDishes() {
    try {
      const response = await fetch("./js/dishes.json");
      const dishes = await response.json();
  
      const container = document.getElementById("dishes-container");
  
      dishes.forEach((dish, index) => {
        const div = document.createElement("div");
        div.classList.add("dish");
  
        div.innerHTML = `
          <div class="text">
            <h3>${dish.name}</h3>
            <p>${dish.origin}</p>
          </div>
          <div class="image">
            <img src="${dish.image}" alt="${dish.name}">
          </div>
        `;
  
        container.appendChild(div);
  
        // Apply fade-in animation with staggered delay
        setTimeout(() => {
          div.classList.add("visible");
        }, index * 200);
      });
  
    } catch (error) {
      console.error("Failed to load dishes:", error);
    }
  }
  
  window.addEventListener("load", loadDishes);
  
  
  //quotes
  async function fetchTestimonials() {
    const response = await fetch("./js/testimonials.json");
    return response.json();
  }
  
  function startCarousel(data) {
    const carousel = document.getElementById("carousel");
    let index = 0;
  
    function showQuote() {
      const quote = data[index];
      carousel.innerHTML = `<p>"${quote.message}"<br>– <strong>${quote.author}</strong></p>`;
      index = (index + 1) % data.length;
    }
  
    showQuote();
    setInterval(() => {
      new Promise(resolve => {
        carousel.style.opacity = 0;
        setTimeout(() => {
          resolve();
        }, 500);
      }).then(() => {
        showQuote();
        carousel.style.opacity = 1;
      });
    }, 3000);
  }
  
  fetchTestimonials().then(startCarousel);
  // On window load, add "visible" class to all .fade-in elements in #history
  