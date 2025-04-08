// // regional-food.js

// document.addEventListener("DOMContentLoaded", () => {
//     const filterButtons = document.querySelectorAll(".filter-btn");
//     const cuisineGrid = document.getElementById("cuisineGrid");
//     const searchInput = document.getElementById("search");
//     const regionDetails = document.getElementById("regionDetails");
//     const mapMarkers = document.querySelectorAll(".map-marker");
//     const searchBtn = document.getElementById("search-btn");
  
//     let cuisineData = [];

  
//     // Fetch JSON Data
//     async function fetchCuisineData() {
//       try {
//         const response = await fetch("/cuisines.json");
//         const data = await response.json();
//         cuisineData = data;
//         renderCuisines(data);
//       } catch (error) {
//         console.error("Failed to load cuisine data:", error);
//       }
//     }
  
//     // Render cuisines
//     function renderCuisines(data) {
//       cuisineGrid.innerHTML = "";
//       data.forEach(item => {
//         const card = document.createElement("div");
//         card.className = "cuisine-card";
//         card.setAttribute("data-region", item.region.toLowerCase());
//         card.innerHTML = `
//           <img src="${item.image}" alt="${item.name}" />
//           <h3>${highlightKeyword(item.name)}</h3>
//           <p>${highlightKeyword(item.description)}</p>
//           <button>View Recipes</button>
//         `;
//         cuisineGrid.appendChild(card);
//       });
//     }
  
//     // Filter region buttons
//     filterButtons.forEach(btn => {
//       btn.addEventListener("click", () => {
//         filterButtons.forEach(b => b.classList.remove("active"));
//         btn.classList.add("active");
//         const selectedRegion = btn.dataset.region;
//         const filtered = selectedRegion === "all" ? cuisineData : cuisineData.filter(item => item.region.toLowerCase() === selectedRegion);
//         renderCuisines(filtered);
//       });
//     });
  
//     // Search functionality
//     searchInput.addEventListener("input", () => {
//       const keyword = searchInput.value.toLowerCase();
//       const filtered = cuisineData.filter(item =>
//         item.name.toLowerCase().includes(keyword) ||
//         item.description.toLowerCase().includes(keyword)
//       );
//       renderCuisines(filtered);
//     });
  
//     // Highlight matched text
//     function highlightKeyword(text) {
//       const keyword = searchInput.value.trim();
//       if (!keyword) return text;
//       const regex = new RegExp(`(${keyword})`, "gi");
//       return text.replace(regex, '<mark>$1</mark>');
//     }
    

//     const regionInfo = {
//         north: {
//           title: "North India",
//           description: "Famous for dishes like Butter Chicken, Rogan Josh, Chole Bhature."
//         },
//         south: {
//           title: "South India",
//           description: "Home to Masala Dosa, Idli-Sambar, and Hyderabadi Biryani."
//         },
//         east: {
//           title: "East India",
//           description: "Known for Macher Jhol, Pakhala Bhata, and sweets like Rasgulla."
//         },
//         west: {
//           title: "West India",
//           description: "Enjoy Dhokla, Goan Fish Curry, and Vada Pav."
//         },
//         northeast: {
//           title: "Northeast India",
//           description: "Try Thukpa, Bamboo Shoot Pork, and Momos."
//         }
//       };
    
//     // Handle map marker clicks
//     mapMarkers.forEach(marker => {
//         marker.addEventListener("click", () => {
//             const region = marker.dataset.region;
//             const info = regionInfo[region];
      
//             regionDetails.innerHTML = `
//               <div class="cuisine-region">
//                 <h2>${info.title}</h2>
//                 <p>${info.description}</p>
//               </div>
//             `;
      
//             // Optional: scroll into view for better UX
//             regionDetails.scrollIntoView({ behavior: "smooth" });
//           });
//     });
  
//     // Initial load
//     fetchCuisineData();
//   });
document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const cuisineGrid = document.getElementById("cuisineGrid");
    const searchInput = document.getElementById("search");
    const regionDetails = document.getElementById("regionDetails");
    const mapMarkers = document.querySelectorAll(".map-marker");
    const searchBtn = document.getElementById("search-btn");
  
    let cuisineData = [];
  
    const regionInfo = {
      north: {
        title: "North India",
        description: "Famous for dishes like Butter Chicken, Rogan Josh, Chole Bhature."
      },
      south: {
        title: "South India",
        description: "Home to Masala Dosa, Idli-Sambar, and Hyderabadi Biryani."
      },
      east: {
        title: "East India",
        description: "Known for Macher Jhol, Pakhala Bhata, and sweets like Rasgulla."
      },
      west: {
        title: "West India",
        description: "Enjoy Dhokla, Goan Fish Curry, and Vada Pav."
      },
      northeast: {
        title: "Northeast India",
        description: "Try Thukpa, Bamboo Shoot Pork, and Momos."
      }
    };
  
    // Fetch JSON Data
    async function fetchCuisineData() {
      try {
        const response = await fetch("./js/cuis.json");
        const data = await response.json();
        cuisineData = data;
        renderCuisines(data);
      } catch (error) {
        console.error("Failed to load cuisine data:", error);
      }
    }
  
    // Render cuisines
    function renderCuisines(data) {
      cuisineGrid.innerHTML = "";
      data.forEach(item => {
        const card = document.createElement("div");
        card.className = "cuisine-card";
        card.setAttribute("data-region", item.region.toLowerCase());
        card.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <h3>${highlightKeyword(item.name)}</h3>
          <p>${highlightKeyword(item.description)}</p>
          <button>View Recipes</button>
        `;
        cuisineGrid.appendChild(card);
      });
  
      // Center the content if not full-width
      if (data.length > 0) {
        cuisineGrid.style.display = "grid";
        cuisineGrid.style.justifyContent = "center";
      }
    }
  
    // Highlight matched text
    function highlightKeyword(text) {
      const keyword = searchInput.value.trim();
      if (!keyword) return text;
      const regex = new RegExp(`(${keyword})`, "gi");
      return text.replace(regex, "<mark>$1</mark>");
    }
  
    // Region button filtering
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
  
        const selectedRegion = btn.dataset.region;
        const filtered =
          selectedRegion === "all"
            ? cuisineData
            : cuisineData.filter(
                item => item.region.toLowerCase() === selectedRegion
              );
  
        renderCuisines(filtered);
      });
    });
  
    // Search input real-time filtering (optional)
    searchInput.addEventListener("input", () => {
      const keyword = searchInput.value.toLowerCase();
      const filtered = cuisineData.filter(
        item =>
          item.name.toLowerCase().includes(keyword) ||
          item.description.toLowerCase().includes(keyword)
      );
      renderCuisines(filtered);
    });
  
    // 🔍 Search button click — full enhanced behavior
    searchBtn.addEventListener("click", () => {
      const keyword = searchInput.value.toLowerCase();
      const filtered = cuisineData.filter(
        item =>
          item.name.toLowerCase().includes(keyword) ||
          item.description.toLowerCase().includes(keyword)
      );
  
      renderCuisines(filtered);
  
      if (filtered.length > 0) {
        // Scroll to cuisine grid
        cuisineGrid.scrollIntoView({ behavior: "smooth" });
  
        // Highlight matching regions
        const matchedRegions = [...new Set(filtered.map(item => item.region.toLowerCase()))];
  
        mapMarkers.forEach(marker => {
          const region = marker.dataset.region;
          if (matchedRegions.includes(region)) {
            marker.setAttribute("fill", "orange");
            marker.setAttribute("r", "14");
          } else {
            marker.setAttribute("fill", "gray");
            marker.setAttribute("r", "10");
          }
        });
  
        // Auto show region info (for first match)
        const firstRegion = matchedRegions[0];
        if (firstRegion && regionInfo[firstRegion]) {
          regionDetails.innerHTML = `
            <div class="cuisine-region">
              <h2>${regionInfo[firstRegion].title}</h2>
              <p>${regionInfo[firstRegion].description}</p>
            </div>
          `;
          regionDetails.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        regionDetails.innerHTML = `<p>No results found.</p>`;
      }
    });
  
    // Map marker click event
    mapMarkers.forEach(marker => {
      marker.addEventListener("click", () => {
        const region = marker.dataset.region;
        const info = regionInfo[region];
  
        regionDetails.innerHTML = `
          <div class="cuisine-region">
            <h2>${info.title}</h2>
            <p>${info.description}</p>
          </div>
        `;
  
        regionDetails.scrollIntoView({ behavior: "smooth" });
      });
    });
  
    // Initial load
    fetchCuisineData();
  });
  