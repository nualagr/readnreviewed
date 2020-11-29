// API baseURL
const baseURL = "https://www.googleapis.com/books/v1/volumes?q=intitle:foundation+inauthor:asimov+isbn:9780586017135&printType=books&key=AIzaSyDR3pb09aEo_zdemgtte5eM0eLsHFNXmVI"; 


//AIzaSyDR3pb09aEo_zdemgtte5eM0eLsHFNXmVI

function getData(cb){
    let xhr = new XMLHttpRequest();

    xhr.open("GET", baseURL);

    xhr.send();

    xhr.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            cb(JSON.parse(this.responseText));
        }
        else if (this.status !== 200) {
            document.getElementById("bookContentContainer").innerHTML=`<h5>Error: ${this.responseText} </h5>`;
        }
    };
}


function writeToDocument(){
    let el = document.getElementById("bookContentContainer");
    // Sets the page back to blank every time the button is clicked.
    el.innerHTML = "";
    let img = document.getElementById("bookCoverContainer");
    img.innerHTML = "";

    getData(function(data){

        // data is an object
        // it has items, data.items
        // data.items is an array of book objects
        // each book object has a bunch of properties, such as volumeInfo, searchInfo

        books = data.items;
        firstBook = books[0]; // data.items[0] is the first book
        let author = books[0]["volumeInfo"]["authors"];
        let title = books[0]["volumeInfo"]["title"];
        let publisher = books[0]["volumeInfo"]["publisher"];
        let publishedDate = books[0]["volumeInfo"]["publishedDate"];
        let pageCount = books[0]["volumeInfo"]["pageCount"];
        let description = books[0]["volumeInfo"]["description"];
        let isbn = books[0]["volumeInfo"]["industryIdentifiers"][0]["identifier"];
        let genre = books[0]["volumeInfo"]["categories"][0];
        let thumbnail = books[0]["volumeInfo"]["imageLinks"]["thumbnail"];

        //data = data.items;
        //Print data to console
        console.log(data);
        // console.log(data.items[0]["volumeInfo"]);
        // console.log(data[0].volumeInfo);
        console.log("Title: " + title);
        console.log("Author: " + author);
        console.log("Genre: " + genre);
        console.log("Image Link: " + thumbnail);
        console.log("Publisher: " + publisher);
        console.log("Date published: " + publishedDate);
        console.log("Page Count: " + pageCount);
        console.log("Description: " + description);
        console.log("ISBN: " + isbn);

        img.innerHTML += "<img src='" + thumbnail + "' width='50%' height='auto'>";

        el.innerHTML += "<p>Title: " + title + "</p>" +
        "<p>Author: " + author + "</p>" +
        "<p>Genre: " + genre + "</p>" +
        "<p>Publisher: " + publisher + "</p>" +
        "<p>Date Published: " + publishedDate + "</p>" +
        "<p>Page Count: " + pageCount + "</p>" +
        "<p>Description: " + description + "</p>" +
        "<p>ISBN: " + isbn + "</p>";
    })
}

  $(document).ready(function(){
    /* Initialization of the dropdown trigger taken from https://materializecss.com/navbar.html#! */
    $(".dropdown-trigger").dropdown();
    /* Initialization of the side-nav trigger taken from https://materializecss.com/navbar.html */
    $('.sidenav').sidenav();
    /* Initialization of the carousel taken from https://materializecss.com/carousel.html */
    $('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true
  });
      /* Initialization of the dropdown select form field taken from https://materializecss.com/carousel.html */
    $('select').formSelect();
    });
