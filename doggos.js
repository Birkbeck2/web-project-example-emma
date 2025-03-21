document.addEventListener("DOMContentLoaded", function () {
    fetch('doggos.json')
        .then(response => response.json())
        .then(doggos => {
            const dataDisplay = document.getElementById('data');
            const locationFilter = document.getElementById('locationFilter');
            const breedFilter = document.getElementById('breedFilter');
            const ageFilter = document.getElementById('ageFilter');

            // For the dog of the day modal pop up box
            const popUp = document.getElementById('popUp');
            const closePopUp = document.querySelector('.close');
            const popUpContainer = document.getElementById('dogOfTheDay');

            // Populate dropdowns
            populateDropdowns(doggos);

            // Using a forEach function to populate dropdown items
            function populateDropdowns(doggos) {
                const locations = new Set();
                const breeds = new Set();
                const ages = new Set();

                doggos.forEach(doggo => {
                    locations.add(doggo.location);
                    breeds.add(doggo.breed);
                    ages.add(doggo.age);
                });

                // Convert sets to arrays and sort them so they are in alpahbetical/numerical order
                const sortedLocations = Array.from(locations).sort();
                const sortedBreeds = Array.from(breeds).sort();
                const sortedAges = Array.from(ages).sort((a, b) => a - b); // Sorting numbers

                // Populate location filter using forEach function, for each location it finds in the JSON, it will attach it as an option, same for breed and age below.
                sortedLocations.forEach(location => {
                    const option = document.createElement('option');
                    option.value = location;
                    option.textContent = location;
                    locationFilter.appendChild(option);
                });

                // Populate breed filter
                sortedBreeds.forEach(breed => {
                    const option = document.createElement('option');
                    option.value = breed;
                    option.textContent = breed;
                    breedFilter.appendChild(option);
                });

                // Populate age filter
                sortedAges.forEach(age => {
                    const option = document.createElement('option');
                    option.value = age;
                    option.textContent = age;
                    ageFilter.appendChild(option);
                });
            }

            // Function to filter and display doggos based on selected criteria
            function filterDoggos() {
                const location = locationFilter.value.toLowerCase();
                const breed = breedFilter.value.toLowerCase();
                const age = ageFilter.value;

                dataDisplay.innerHTML = ''; // Clear previous doggos
                doggos.forEach(doggo => {
                    if ((location === '' || doggo.location.toLowerCase() === location) &&
                        (breed === '' || doggo.breed.toLowerCase() === breed) &&
                        (age === '' || doggo.age == age)) {
                        // Create HTML elements (div or paragraph) to display the data from JSON file in the HTML
                        const doggoContainer = document.createElement("div");

                        const nameElement = document.createElement("p");
                        nameElement.innerHTML = `<b>${doggo.name}</b> &#9829;`;

                        const ageElement = document.createElement("p");
                        ageElement.innerHTML = `<b>Age</b> - ${doggo.age}`;

                        const sexElement = document.createElement("p");
                        sexElement.innerHTML = `<b>Sex</b> - ${doggo.sex}`;

                        //The below then adds the information into the 'box' created above. 'join' adds all the elements in the array as a string so it appears as a sentance seperated by a comma.
                        const personalityElement = document.createElement("p");
                        personalityElement.innerHTML = `<b>Personality</b> <br> ${doggo.personality.join(", ")}`;

                        const breedElement = document.createElement("p");
                        breedElement.innerHTML = `<b>Breed</b> - ${doggo.breed}`;

                        const infoElement = document.createElement("p");
                        infoElement.innerHTML = `<b>${doggo.info}.</b>`;

                        const locationElement = document.createElement("p");
                        locationElement.innerHTML = `<b>Location</b> - ${doggo.location}`;

                        const imgElement = document.createElement("img");
                        imgElement.src = doggo.image;
                        // adding alt text in case image doesn't show or using screen readers
                        imgElement.alt = doggo.name + " image";
                        imgElement.height = 200;

                        // Append the elements to the doggo container
                        doggoContainer.appendChild(nameElement);
                        doggoContainer.appendChild(imgElement);
                        doggoContainer.appendChild(ageElement);
                        doggoContainer.appendChild(sexElement);
                        doggoContainer.appendChild(personalityElement);
                        doggoContainer.appendChild(breedElement);
                        doggoContainer.appendChild(locationElement);
                        doggoContainer.appendChild(infoElement);

                        // Append the doggo container to the main data display area
                        dataDisplay.appendChild(doggoContainer);
                    }
                });
            }

            // Initial display of all doggos
            filterDoggos();

            // Event listeners for filter change
            locationFilter.addEventListener('change', filterDoggos);
            breedFilter.addEventListener('change', filterDoggos);
            ageFilter.addEventListener('change', filterDoggos);

            // Making the dog of the day show a randomly selected dog each time by using Math.random
            function showRandomDogOfTheDay() {
                popUpContainer.innerHTML = ''; // Clear previous content

                const randomDog = doggos[Math.floor(Math.random() * doggos.length)];

                const nameElement = document.createElement("p");
                nameElement.innerHTML = `This is <b>${randomDog.name}</b> 🐶`;

                const personalityElement = document.createElement("p");
                personalityElement.innerHTML = `${randomDog.name} has the following lovable traits - <br> <b>${randomDog.personality.join(", ")}</b>.`;

                // adding styling to the image and appending to the container
                const imgElement = document.createElement("img");
                imgElement.src = randomDog.image;
                imgElement.alt = randomDog.name + " image";
                imgElement.style.width = "150px";
                imgElement.style.height = "150px";
                imgElement.style.objectFit = "cover";
                imgElement.style.boxShadow = "-10px 10px 0 rgb(255, 255, 255)";

                popUpContainer.appendChild(imgElement);
                popUpContainer.appendChild(nameElement);
                popUpContainer.appendChild(personalityElement);
                
                popUp.style.display = "block";
            }

            // Popup will display after user has been on the page for 30 seconds
            setTimeout(showRandomDogOfTheDay, 3000);

            // Close popup on close button click, note I did not use this on the booking form as I do not want te user to accidently clicks out half way filling in the booking form. This would be very frustrating, leading to a poor user experience and could potentialy lose the client money/bookings.
            closePopUp.onclick = function() {
                popUp.style.display = "none";
            }
        })
        .catch(error => console.error("Error fetching JSON data:", error));
});

     

