What was your motivation?
ArtConnect is a online gallery portal that allows enthusiast to discover art, events, artist and more!
Why did you build this project?
I built this as a way to apply my skills in HTML and css to create something I am both proud and shocked I was able to create with my own hands.
What problem does it solve?
ArtConnect solves the accesibility issue of emerging artist and enthusiast
What did you learn?
I learned that css is not as complicated as I thought but making sure your functions and properties are aligning correctly across multiple diffent pages can be quite fustrating.
What makes your project stand out? If your project has a lot of features, consider adding a "Features" section and listing them here.
I am really proud of my gallery area I think it is very clean and has strong filtering/sorting to find exactly what you need.

Features:
Interactive Gallery Grid: Allows one to browse fine art selections with built-infiltering by category.
Dynamic Sorting: Sort artworks dynamically by title or price.
Event Dashboard:View information on local art exhibitions, auctions, and workshops.
Media Lightbox Overlay: Clean full-screen picture enlargement using image overlay modal that supports both gallery and event image collections.
Dynamic Information Alerts: Click cards to review event and artist breakdowns.
FAQ Toggle System: Expandable, simple accordion component interface for questions.
Academic Document: References Page Formatted links routing directly back to original source.

Architecture

ArtConnect
│
├── frontend/
│   ├── index.html            # Home
│   │
│   ├── css/
│   │   └── style.css         # Main stylesheet
│   │
│   ├── js/
│   │   └── script.js         # Functions (interaction, filtering,, lightbox Script)
│   │
│   ├── images/               # Media (logos, artwork, banners)
│   │
│   └── pages/                # Supplemental Web Pages
│       ├── gallery.html      # Art Showcase Grid & Sorting Portal
│       ├── events.html       # Event page
│       ├── artSubmit.html    # Art Submission Form
│       ├── FAQ.html          # FAQ accordion
│       └── references.html   # Media Citation & Reference
│
├── backend/                  # Backend Files Repository
│
└── README.md                 # Project Documentation