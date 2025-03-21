let currentFactIndex = 0;
let facts = [];

// Fetches data from JSON file
fetch('facts.json')
  .then(response => response.json())
  .then(data => {
    facts = data.facts;
    displayFacts();
  })
  .catch(error => console.error('Error fetching data:', error));

// Function to display a new fact every 20 seconds, looping through the JSON file.
function displayFacts() {
  showFact(currentFactIndex);
  setInterval(() => {
    hideFact();
    setTimeout(() => {
      currentFactIndex = (currentFactIndex + 1) % facts.length;
      showFact(currentFactIndex);
    }, 2000); // Waits for fade-out transition to finish before changing to the next fact
  }, 20000); // new fact shows every 20 seconds
}

// Function to show the current fact with fade-in effect
function showFact(index) {
  const factContainer = document.getElementById('factContainer');
  factContainer.innerHTML = facts[index].fact;
  factContainer.classList.add('fade-in');
  factContainer.classList.remove('fade-out');
}

// Function to hide the current fact with fade-out effect
function hideFact() {
  const factContainer = document.getElementById('factContainer');
  factContainer.classList.remove('fade-in');
  factContainer.classList.add('fade-out');
}