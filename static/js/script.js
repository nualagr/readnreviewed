// API baseURL
const baseURL = "https://www.googleapis.com/books/v1/volumes?q=";

const key = "&printType=books";

function getData(title, author, cb){
    let xhr = new XMLHttpRequest();
    // Use encodeURIcomponent() to replace each instance of a space in the 
    // title or author inputs with %20
    let bookTitle = "intitle:" + encodeURIComponent(title);
    console.log("The searched for book title is:", bookTitle);
    let bookAuthor = "+inauthor:" + encodeURIComponent(author);
    console.log("The searched for book author is:", bookAuthor);
    // let bookIsbn = "+isbn:" + isbn;

    // xhr.open("GET", baseURL + bookTitle + bookAuthor + bookIsbn + key);
    let path = baseURL;
    if (title) {
        path += bookTitle;
    }
    if (author) {
        path += bookAuthor;
    }
    path += key;
    xhr.open("GET", path);

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

    getData(title, author, function(data){

        // data is an object
        // it has items, data.items
        // data.items is an array of book objects
        // each book object has a bunch of properties, such as volumeInfo, searchInfo
        console.log(data);
        let searchList = [];
        let books = data.items;
        for (i in books) {
            let index = i;
            let img = "";
            let thumbnail = "";
            let title = "";
            let authors = "";
            let category = "";
            let description = "";
            let publisher = "";
            let publishedDate = "";
            let pageCount = "";
            let isbn = "";
            let textSnippet = "";

            if (books[i]["volumeInfo"] && books[i]["volumeInfo"]["imageLinks"] && books[i]["volumeInfo"]["imageLinks"]["thumbnail"]) {
                img = books[i]["volumeInfo"]["imageLinks"]["thumbnail"];
                thumbnail = img.substring(0, 4) + 's' + img.substring(4);
            }
            if (books[i]["volumeInfo"] && books[i]["volumeInfo"]["title"]) {
                title = books[i]["volumeInfo"]["title"];
            }
            if (books[i]["volumeInfo"] && books[i]["volumeInfo"]["authors"]) {
                authors = books[i]["volumeInfo"]["authors"];
            }
            if (books[i]["volumeInfo"] && books[i]["volumeInfo"]["categories"] && books[i]["volumeInfo"]["categories"][0]) {
                category = books[i]["volumeInfo"]["categories"][0];
            }
            if (books[i]["volumeInfo"] && books[i]["volumeInfo"]["description"]) {
                description = books[i]["volumeInfo"]["description"];
            }
            if (books[i]["volumeInfo"] && books[i]["volumeInfo"]["publisher"]) {
                publisher = books[i]["volumeInfo"]["publisher"];
            }
            if (books[i]["volumeInfo"] && books[i]["volumeInfo"]["publishedDate"]) {
                publishedDate = books[i]["volumeInfo"]["publishedDate"];
            }
            if (books[i]["volumeInfo"] && books[i]["volumeInfo"]["pageCount"]) {
                pageCount = books[i]["volumeInfo"]["pageCount"];
            }
            if (books[i]["volumeInfo"] && books[i]["volumeInfo"]["industryIdentifiers"] && books[i]["volumeInfo"]["industryIdentifiers"][0] && books[i]["volumeInfo"]["industryIdentifiers"][0]["identifier"]) {
                isbn = books[i]["volumeInfo"]["industryIdentifiers"][0]["identifier"];
            }
            if (books[i]["searchInfo"] && books[i]["searchInfo"]["textSnippet"]) {
                textSnippet = books[i]["searchInfo"]["textSnippet"];
            }

            var dict = {
                "thumbnail" : thumbnail,
                "title" : title,
                "authors" : authors,
                "category" : category,
                "description" : description,
                "publisher" : publisher,
                "publishedDate" : publishedDate,
                "pageCount" : pageCount,
                "isbn" : isbn,
                "textSnippet" : textSnippet,
            }
            searchList.push(dict)
        }
        console.log("SearchList:", searchList);

        // Print data to screen
            for (i in searchList) {
                // How to encode string to base 64 found at Stack Overflow: https://stackoverflow.com/questions/246801/how-can-you-encode-a-string-to-base64-in-javascript
                el.innerHTML += `<div class='row'><div class='col s12 m6 center-align'><img src='${searchList[i]["thumbnail"]}' class='centered'><br><button type='submit' class='btn bg-blue' onclick='sendToPython("${btoa(encodeURIComponent(JSON.stringify(searchList[i])))}");'>Choose This Edition</button></div><div class='col s12 m6'><table><tr><td>Title:</td><td> ${searchList[i]["title"]}</td></tr>
                <tr><td>Author:</td><td>${searchList[i]["authors"]}</td></tr>
                <tr><td>Category:</td><td>${searchList[i]["category"]}</td></tr>
                <tr><td>Snippet:</td><td>${searchList[i]["textSnippet"]}</td></tr>
                <tr><td>Publisher:</td><td>${searchList[i]["publisher"]}</td></tr>
                <tr><td>Date Published:</td><td>${searchList[i]["publishedDate"]}</td></tr>
                <tr><td>Page Count:</td><td>${searchList[i]["pageCount"]}</td></tr>
                <tr><td>ISBN:</td><td>${searchList[i]["isbn"]}</td></tr></table><br></div></div>`;
        }
    })
}


function sendToPython(book){
    console.log("I have been called");
    let newBook = JSON.parse(decodeURIComponent(atob(book)));
    console.log("This is the new book coming to you from JS:", newBook);
    // POST book to Python
    // So it can be uploaded to the database
    fetch("/add_book", {
        method: 'POST',
        headers: { 
            'Content-type': 'application/json',
        },
        body: JSON.stringify(newBook),
        }).then(response => window.location.href = response["url"]); //redirect to the view_page for the new book
    // .then(location.reload());
        console.log("This is the chosen book:", newBook)
}


// Copied from Putting it All Together project and then modified
function sendMail(contactForm){
    emailjs.send("gmail", "read_n_reviewed_template", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.email.value,
        "message": contactForm.message.value,
    })
    .then(function(response) {
            console.log("SUCCESS", response.status, response.text);
            // Solution to loading the homepage found on Stack Overflow: https://stackoverflow.com/questions/4231605/how-to-redirect-to-home-page
            window.location.href = "/";
        }, function(error) {
            console.log("FAILED...", error);
        });
    return false; //to block from loading a new page
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
