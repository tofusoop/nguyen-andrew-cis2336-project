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

    // 3. Extract only the digits following the dollar sign
    let match = text.match(/\$(\d+)/);
    if (match) {
        return Number(match[1]);
    }
    
    return 0; // Default fallback if no price is found
}
// Display artwork details dynamically
let cards = document.querySelectorAll(".art-card");
cards.forEach(function(card){
    card.addEventListener("click", function(){
        let title = card.querySelector("h3").innerText;
        let artist = card.querySelector(".artist");
        if (artist) {
            alert(
                "Artwork: " + title +
                "\nArtist: " + artist.innerText +
                "\nCategory: " + card.dataset.category
            );
        }
    });
});

// Display event details dynamically
let events = document.querySelectorAll(".event-card");
events.forEach(function(event){
    event.addEventListener("click", function(){
        let title = event.querySelector("h3").innerText;
        let description = event.querySelectorAll("p")[0].innerText;
        let date = event.querySelectorAll("p")[1].innerText;
        let location = event.querySelectorAll("p")[2].innerText;
        alert(
            "Event: " + title +
            "\n" + description +
            "\n" + date +
            "\n" + location
        );
    });
});


// Image enlargement
function enlargeImage(image){
    if(image.style.width === "500px"){
        image.style.width = "200px";
    } else {
        image.style.width = "500px";
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

    let questions = document.querySelectorAll("h2");

    questions.forEach(function(question) {

        question.addEventListener("click", function() {

            let answer = question.nextElementSibling;

            if (answer.style.display === "block") {
                answer.style.display = "none";
            } else {
                answer.style.display = "block";
            }

        });

    });

});