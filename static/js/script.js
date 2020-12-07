// API baseURL
// const baseURL = "https://www.googleapis.com/books/v1/volumes?q=intitle:foundation+inauthor:asimov+isbn:9780586017135&printType=books&key=AIzaSyDR3pb09aEo_zdemgtte5eM0eLsHFNXmVI"; 
const baseURL = "https://www.googleapis.com/books/v1/volumes?q=";
// const key = "&orderBy=relevance&langRestrict=en&printType=books&key=AIzaSyDR3pb09aEo_zdemgtte5eM0eLsHFNXmVI";
const key = "&printType=books&key=AIzaSyDR3pb09aEo_zdemgtte5eM0eLsHFNXmVI";
//AIzaSyDR3pb09aEo_zdemgtte5eM0eLsHFNXmVI

function getData(title, author, cb){
    let xhr = new XMLHttpRequest();
    // Use encodeURIcomponent() to replace each instance of a space in the 
    // title or author inputs with %20
    let bookTitle = "intitle:" + encodeURIComponent(title);
    console.log(bookTitle);
    let bookAuthor = "+inauthor:" + encodeURIComponent(author);
    console.log(bookAuthor);
    // let bookIsbn = "+isbn:" + isbn;

    // xhr.open("GET", baseURL + bookTitle + bookAuthor + bookIsbn + key);
    xhr.open("GET", baseURL + bookTitle + bookAuthor + key);

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


function writeToDocument(title, author){
    console.log(title)
    console.log(author)
    let el = document.getElementById("bookContentContainer");
    // Sets the page back to blank every time the button is clicked.
    el.innerHTML = "";
    let cover = document.getElementById("bookCoverContainer");
    cover.innerHTML = "";

    getData(title, author, function(data){

        // data is an object
        // it has items, data.items
        // data.items is an array of book objects
        // each book object has a bunch of properties, such as volumeInfo, searchInfo
        console.log(data);
        books = data.items;
        firstBook = books[0]; // data.items[0] is the first book
        let img = books[0]["volumeInfo"]["imageLinks"]["thumbnail"];
        // insert "s" into http
        let thumbnail = img.substring(0, 4) + 's' + img.substring(4);
        let title = books[0]["volumeInfo"]["title"];
        let authors = books[0]["volumeInfo"]["authors"];
        let category = books[0]["volumeInfo"]["categories"][0];
        let description = books[0]["volumeInfo"]["description"];
        let publisher = books[0]["volumeInfo"]["publisher"];
        let publishedDate = books[0]["volumeInfo"]["publishedDate"];
        let pageCount = books[0]["volumeInfo"]["pageCount"];
        let isbn = books[0]["volumeInfo"]["industryIdentifiers"][0]["identifier"];
        let textSnippet = books[0]["searchInfo"]["textSnippet"];
        console.log(textSnippet);

        // Create dictionary of the book
        let book = {
            "thumbnail": thumbnail,
            "title": title,
            "authors": authors,
            "category": category,
            "description": description,
            "publisher": publisher,
            "published_date": publishedDate,
            "page_count": pageCount,
            "isbn": isbn,
            "text_snippet": textSnippet,
        };
        console.log(book);
        // POST book to Python
        // So it can be uploaded to the database
        fetch("/add_book", {
            method: 'POST',
            headers: { 
                'Content-type': 'application/json',
            },
            body: JSON.stringify(book),
        }).then(response => console.log(response));
        // .then(location.reload());


        // Print data to screen
        cover.innerHTML += "<img src='" + thumbnail + "' class='centered'>";

        el.innerHTML += "<table><tr><td>Title:</td><td> " + title + "</td></tr>" +
        "<tr><td>Author:</td><td>" + authors[0] + "</td></tr>" +
        "<tr><td>Category:</td><td>" + category + "</td></tr>" +
        "<tr><td>Snippet:</td><td>" + textSnippet + "</td></tr>" +
        "<tr><td>Publisher:</td><td>" + publisher + "</td></tr>" +
        "<tr><td>Date Published:</td><td>" + publishedDate + "</td></tr>" +
        "<tr><td>Page Count:</td><td>" + pageCount + "</td></tr>" +
        "<tr><td>ISBN:</td><td>" + isbn + "</td></tr></table>";
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
