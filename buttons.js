//Booking form button functionality, once button is clicked this will open
function togglePopup() { 
    const overlay = document.getElementById('popupOverlay'); 
    overlay.classList.toggle('show'); 
} 

// displays the thank you alert once submit is clicked
function bookingConfirm() {
    const overlay = document.getElementById('popupOverlay'); 
    overlay.classList.toggle('show'); 
    alert("Thank you for your booking!");
}

// closes form
function cancelForm() { 
    const overlay = document.getElementById('popupOverlay'); 
    overlay.classList.toggle('show'); 
}

// Register now form, shows thank you alert and then resets the form so it's blank after button is clicked
function registerConfirm() {
    document.getElementById("register").reset();
    alert("Thank you registering your interest!");
}

