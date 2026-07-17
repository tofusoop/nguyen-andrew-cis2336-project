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
    let gallery = document.getElementById("gallery");
    let artworks = Array.from(
        document.querySelectorAll(".art-card")
    );
    artworks.sort(function(a, b) {
        if (type === "title") {
            let titleA = a.querySelector("h3").innerText;
            let titleB = b.querySelector("h3").innerText;
            return titleA.localeCompare(titleB);
        }
        if (type === "price") {
            let priceA = getPrice(a);
            let priceB = getPrice(b);
            return priceA - priceB;
        }
        return 0;
    });

 // Put sorted cards back into gallery
    artworks.forEach(function(art){
        gallery.appendChild(art);
    });
}

// Get price from artwork card
function getPrice(card){
    let text = card.innerText;
    let match = text.match(/\$(\d+)/);
    if(match){
        return Number(match[1]);
    }
    return 0;
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