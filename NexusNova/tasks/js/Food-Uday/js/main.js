// const themeToggleButton = document.getElementById('theme-toggle');

// themeToggleButton.addEventListener('click', () => {
//     document.body.classList.toggle('dark-mode');
    
//     // Change the icon based on the current theme
//     if (document.body.classList.contains('dark-mode')) {
//         themeToggleButton.innerHTML = '🌞'; // Sun icon for light mode
//     } else {
//         themeToggleButton.innerHTML = '🌙'; // Moon icon for dark mode
//     }
// });

// main.js
document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;
  
    // Apply saved mode
    if (localStorage.getItem("theme") === "dark") {
      body.classList.add("dark");
      darkModeToggle.textContent = "☀️";
    }
  
    // Toggle dark mode
    darkModeToggle.addEventListener("click", () => {
      body.classList.toggle("dark");
  
      if (body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        darkModeToggle.textContent = "☀️";
      } else {
        localStorage.setItem("theme", "light");
        darkModeToggle.textContent = "🌙";
      }
    });
  });
  