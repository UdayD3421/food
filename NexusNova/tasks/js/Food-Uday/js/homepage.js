// // Function to fetch records from the JSON file
// async function fetchRecords() {
//     try {
//         // Fetch the JSON file
//         console.log("fetching");
//         const response = await fetch('E:/NexusNova/tasks/js/Food-Uday/js/cuisine.json');

//         // Check if the response is ok (status code 200-299)
//         if (!response.ok) {
//             throw new Error('Network response was not ok ' + response.statusText);
//         }

//         // Parse the JSON data
//         const records = await response.json();

//         // Display the records
//         displayRecords(records);
//     } catch (error) {
//         console.error('There has been a problem with your fetch operation:', error);
//     }
// }

// // Function to display records as cards
// function displayRecords(records) {
//     const container = document.getElementById('cards-container');

//     records.forEach(record => {
//         // Create a card element
//         const card = document.createElement('div');
//         card.className = 'card'; // Add a class for styling

//         // Create card content
//         card.innerHTML = `
//             <img src="${record.image}" alt="${record.name}" class="card-image">
//             <h3>${record.name}</h3>
//             <p>${record.description}</p>
//             <a href="${record.link}" class="card-link">Learn More</a>
//         `;

//         // Append the card to the container
//         container.appendChild(card);
//     });
// }

// // Call the fetchRecords function
// fetchRecords();



//writing fresh
alert("if getting to fetch data then check image in json file");
async function fetchData() {
    const cardsContainer = document.getElementById("cards-container");
    const loader = document.getElementById("loader");
    loader.style.display = "block"; // Show loader

    try {
        const response = await fetch('./js/cuisine.json'); // Fetch from local JSON file
        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }
        
        const users = await response.json();
        cardsContainer.innerHTML = users.map((d, index) => `
            <div class="card ${index === 3 ? 'centered-card' : ''}">
                <h3>${d.name}</h3>
                <img src="${d.img}" alt="${d.name}" class="card-image">
                <p>${d.description}</p>
                <a href="${d.link}" class="card-button">See More</a>
            </div>
        `).join("");
    } catch (error) {
        cardsContainer.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    } finally {
        loader.style.display = "none"; // Hide loader
        console.log("Finally executed");
    }
}

document.addEventListener("DOMContentLoaded", fetchData);

//fun facts starts...
document.addEventListener('DOMContentLoaded', () => {
    const facts = [
        "India has over 100 varieties of rice.",
        "The country is the largest producer of spices in the world.",
        "Indian cuisine includes a wide variety of regional and traditional dishes.",
        "Curry is a popular dish that originated in India.",
        "India is home to the world's largest vegetarian population.",
        "The art of cooking in India is considered a sacred duty.",
        "Chaat is a famous street food that originated in India.",
        "India has a rich history of culinary traditions dating back thousands of years."
    ];

    const factsContainer = document.getElementById('facts-container');
    facts.forEach(fact => {
        const factElement = document.createElement('div');
        factElement.classList.add('fact');
        factElement.innerHTML = `<p>${fact}</p>`;
        factsContainer.appendChild(factElement);
    });

    // Duplicate facts for seamless scrolling
    facts.forEach(fact => {
        const factElement = document.createElement('div');
        factElement.classList.add('fact');
        factElement.innerHTML = `<p>${fact}</p>`;
        factsContainer.appendChild(factElement);
    });
});