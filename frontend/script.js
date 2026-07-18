// Filtering artworks
function filterArt(category) {

    let gallery = document.getElementById("gallery");
    let controls = document.getElementById("controls");
    let artworks = document.querySelectorAll(".art-card");

    artworks.forEach(function(art) {
        if (category === "all" || art.dataset.category === category) {
            art.style.display = "block";
        } else {
            art.style.display = "none";
        }
    });
}


// Sorting artworks
function sortArt(type) {
    let grid = document.getElementById("gallery-grid");
    if (!grid) return; 

    let artworks = Array.from(
        document.querySelectorAll("#gallery-grid .art-card")
    );
    
    artworks.sort(function(a, b) {
        if (type === "title") {
            let titleA = a.querySelector("h3").innerText.trim();
            let titleB = b.querySelector("h3").innerText.trim();
            return titleA.localeCompare(titleB);
        }
        if (type === "price") {
            let priceA = getPrice(a);
            let priceB = getPrice(b);
            return priceA - priceB;
        }
        return 0;
    });

    // Re-append elements in the newly sorted order
    artworks.forEach(function(art){
        grid.appendChild(art);
    });
}

// Highly accurate way to get price from artwork card
function getPrice(card) {
    // 1. Try to find the element specifically designated for the price
    let priceElement = card.querySelector(".price");
    let text = "";

    if (priceElement) {
        text = priceElement.innerText;
    } else {
        // Fallback: If no .price class exists (like Artwork 6), search all paragraphs
        let paragraphs = card.querySelectorAll("p");
        for (let p of paragraphs) {
            if (p.innerText.includes("Price:")) {
                text = p.innerText;
                break;
            }
        }
    }

    // 2. Check if the item is "Not for Sale" or free
    if (text.toLowerCase().includes("not for sale")) {
        return 999999; // Sends unpriced items to the very end of the list
    }

    
    let match = text.match(/\$(\d+)/);
    if (match) {
        return Number(match[1]);
    }
    
    return 0; 
}


// Display artwork details dynamically
let cards = document.querySelectorAll(".art-card");
cards.forEach(function(card){
    card.addEventListener("click", function(event){
        if (event.target.tagName === "IMG") return;

        let title = card.querySelector("h3").innerText;
        let artist = card.querySelector(".artist");
        
        let artistText = artist ? artist.innerText : card.querySelectorAll("p")[1]?.innerText || "Unknown";

        alert(
            "Artwork: " + title +
            "\n" + artistText +
            "\nCategory: " + card.dataset.category
        );
    });
});

// Display event details dynamically
let events = document.querySelectorAll(".event-card");
events.forEach(function(eventCard) {
    eventCard.addEventListener("click", function(e) {
        if (e.target.tagName === "IMG") return;

        let title = eventCard.querySelector("h3").innerText;
        let paragraphs = eventCard.querySelectorAll("p");
        
        let description = "";
        let date = "Date: Not Specified";
        let location = "Location: Not Specified";

        paragraphs.forEach(function(p) {
            let text = p.innerText;
            if (text.startsWith("Date:")) {
                date = text;
            } else if (text.startsWith("Location:")) {
                location = text;
            } else {
                description = text; 
            }
        });

        alert(
            "Event: " + title +
            "\n\nDescription: " + description +
            "\n" + date +
            "\n" + location
        );
    });
});


// Image enlargement Lightbox 
function enlargeImage(clickedImage) {
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-target-img');
    
    lightboxImg.src = clickedImage.src;
    lightbox.style.display = 'flex';
}

// Close the full-screen lightbox image
function closeImage() {
    const lightbox = document.getElementById('gallery-lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
    }
}

// Search functionality
function searchArt(){
    let input = document
        .getElementById("searchInput")
        .value
        .toLowerCase();
    let artworks = document.querySelectorAll(".art-card");
    artworks.forEach(function(art){
        let title = art.querySelector("h3")
            .innerText
            .toLowerCase();
        if(title.includes(input)){
            art.style.display = "block";
        } else {
            art.style.display = "none";

        }
    });
}

// FAQ toggle functionality
document.addEventListener("DOMContentLoaded", function () {
    let questions = document.querySelectorAll(".faq-question, #faq h2");
    if (questions.length === 0) {
        questions = document.querySelectorAll("h2");
    }

    questions.forEach(function(question) {
        question.style.cursor = "pointer"; // Makes it obvious to users they can click it!
        question.addEventListener("click", function() {
            let answer = question.nextElementSibling;
            if (!answer) return;
            if (answer.style.display === "block") {
                answer.style.display = "none";
            } else {
                answer.style.display = "block";
            }
        });
    });
});

// Art Submission Form Handling
document.addEventListener("DOMContentLoaded", function () {
    const submitForm = document.getElementById("artSubmitForm");
    if (submitForm) {
        submitForm.addEventListener("submit", function(event) {
            event.preventDefault(); 
            
            let titleInput = document.getElementById("title")?.value || "Your artwork";
            alert("Success! '" + titleInput + "' has been submitted for review.");
            submitForm.reset(); 
        });
    }
});