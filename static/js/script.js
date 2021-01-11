/*jshint esversion: 6 */
// Suggestion found on StackOverflow (https://stackoverflow.com/questions/8852765/jshint-and-jquery-is-not-defined) to bypass replacing the $ with jquery when passing the code into jshint //
/*globals $:false */

// API baseURL
const baseURL = "https://www.googleapis.com/books/v1/volumes?q=";
const key = "&printType=books";


/**
 * Function to call Google Books API
 */
function getData(title, author, cb) {
    let xhr = new XMLHttpRequest();
    // Use encodeURIcomponent() to replace each instance of a space in the 
    // title or author inputs with %20
    let bookTitle = "intitle:" + encodeURIComponent(title);
    let bookAuthor = "+inauthor:" + encodeURIComponent(author);

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

    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            cb(JSON.parse(this.responseText));
        }
        else if (this.status !== 200) {
            document.getElementById("bookContentContainer").innerHTML = `<h5>Error: ${this.responseText} </h5>`;
        }
    };
}


/**
 * Function to check whether the user's input into the 
 * API Search Form matches the pattern set on the fields.
 * If so, call the writeToDocument() function to make the API call.
 * If not, disable the submit button and alert the user.
 */
function checkApiFormValidity(title, author) {
    let isValidSearchTitle = title.checkValidity();
    let isValidSearchAuthor = author.checkValidity();
    let okButton = document.getElementById("okButton");
    let messageContainer = document.getElementById("messages");
    // Sets the flashed messages back to blank every time the button is clicked.
    messageContainer.innerHTML = "";

    if (isValidSearchTitle && isValidSearchAuthor) {
        okButton.disabled = false;
        writeToDocument(title, author);
    }
    else {
        messageContainer.innerHTML += `<div class="row flashed-messages"><div class="col s12"><h4>Invalid Search. Please try again.</h4></div></div>`;
    }
}

/**
 * Function to take in the title and author from the Add Book form.
 * Call the getData function to make the API call.
 * If API call returns no books flash a message to user.
 * If API call returns books, create a dictionary of each one.
 * Substitute empty strings for information not supplied by Google Books API
 * Add each dict to a list.
 * Iterate through the list of dicts, printing each to the screen for the user to see.
 */
function writeToDocument(title, author) {
    let el = document.getElementById("bookContentContainer");
    let messageContainer = document.getElementById("messages");
    // Sets the page back to blank every time the button is clicked.
    el.innerHTML = "";

    getData(title, author, function (data) {
        let searchList = [];
        let books = data.items;
        if (data.totalItems == 0) {
            messageContainer.innerHTML = `<div class="row flashed-messages"><h4 class>No Results Found</h4></div>`;
        }
        else {
            for (var i in books) {
                // Assign an empty string to the variables
                // as Google Books API does not always contain these fields
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

                // If fields exist overwrite the empty string with the returned information
                if (books[i].volumeInfo && books[i].volumeInfo.imageLinks && books[i].volumeInfo.imageLinks.thumbnail) {
                    img = books[i].volumeInfo.imageLinks.thumbnail;
                    thumbnail = img.substring(0, 4) + 's' + img.substring(4);
                }
                if (books[i].volumeInfo && books[i].volumeInfo.title) {
                    title = books[i].volumeInfo.title;
                }
                if (books[i].volumeInfo && books[i].volumeInfo.authors) {
                    authors = books[i].volumeInfo.authors;
                }
                if (books[i].volumeInfo && books[i].volumeInfo.categories && books[i].volumeInfo.categories[0]) {
                    category = books[i].volumeInfo.categories[0];
                }
                if (books[i].volumeInfo && books[i].volumeInfo.description) {
                    description = books[i].volumeInfo.description;
                }
                if (books[i].volumeInfo && books[i].volumeInfo.publisher) {
                    publisher = books[i].volumeInfo.publisher;
                }
                if (books[i].volumeInfo && books[i].volumeInfo.publishedDate) {
                    publishedDate = books[i].volumeInfo.publishedDate;
                }
                if (books[i].volumeInfo && books[i].volumeInfo.pageCount) {
                    pageCount = books[i].volumeInfo.pageCount;
                }
                if (books[i].volumeInfo && books[i].volumeInfo.industryIdentifiers && books[i].volumeInfo.industryIdentifiers[0] && books[i].volumeInfo.industryIdentifiers[0].identifier) {
                    isbn = books[i].volumeInfo.industryIdentifiers[0].identifier;
                }
                if (books[i].searchInfo && books[i].searchInfo.textSnippet) {
                    textSnippet = books[i].searchInfo.textSnippet;
                }

                var dict = {
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
                searchList.push(dict);
            }

            // Print data to screen
            messageContainer.innerHTML += `<div class="row flashed-messages"><div class="col s12"><h4>Choose the edition you wish to review.</h4></div></div>`;
            for (i in searchList) {
                // How to encode string to base 64 found at Stack Overflow: https://stackoverflow.com/questions/246801/how-can-you-encode-a-string-to-base64-in-javascript
                el.innerHTML += `<div class='row'>\
                    <hr><hr><br>\
                    <div class='col s12 m6 center-align'><img src='${searchList[i].thumbnail}' alt='${searchList[i].title} book cover' class='centered'><br>\
                    <button type='submit' class='btn bg-blue' onclick='sendToPython("${btoa(encodeURIComponent(JSON.stringify(searchList[i])))}");'>Choose This Edition</button>\
                    </div>\
                    <div class='col s12 m6'><table>\
                    <tr><td>Title:</td><td> ${searchList[i].title}</td></tr>
                    <tr><td>Author:</td><td>${searchList[i].authors}</td></tr>
                    <tr><td>Category:</td><td>${searchList[i].category}</td></tr>
                    <tr><td>Snippet:</td><td>${searchList[i].text_snippet}</td></tr>
                    <tr><td>Publisher:</td><td>${searchList[i].publisher}</td></tr>
                    <tr><td>Date Published:</td><td>${searchList[i].published_date}</td></tr>
                    <tr><td>Page Count:</td><td>${searchList[i].page_count}</td></tr>
                    <tr><td>ISBN:</td><td>${searchList[i].isbn}</td></tr>\
                    </table>\
                    <br></div></div>`;
            }
        }
    }
    );
}


/** 
* Function to post the newBook to the back end to be uploaded to the database
*/
function sendToPython(book) {
    let newBook = decodeURIComponent(atob(book));
    fetch("/add_book", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        // newBook is still a JSON string
        body: newBook,
    }).then(response => window.location.href = response.url); //redirect to the view_page for the new book
}


/** 
* Function to send the user's name, email address and message
* to the site administrator in an email 
* using the email service EmailJS.
*/
function sendMail(contactForm) {
    // Function copied from Code Institute 'Putting it All Together' project and then modified
    let messageContainer = document.getElementById("messages");
    emailjs.send("gmail", "read_n_reviewed_template", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.email.value,
        "message": contactForm.message.value,
    })
        .then(function (response) {
            console.log("SUCCESS", response.status, response.text);
            messageContainer.innerHTML += `<div class="row flashed-messages">\
            <div class="col s12">\
            <h4>Your message has been sent.<br>A member of staff will be in touch shortly.</h4>\
            </div></div>`;
            // Visually clear the form input fields
            contactForm.name.value = "";
            contactForm.email.value = "";
            contactForm.message.value = "";
        }, function (error) {
            console.log("FAILED...", error);
            messageContainer.innerHTML += `<div class="row flashed-messages">\
            <div class="col s12">\
            <h4>Error: Your message failed to send. Please try again.</h4>\
            </div></div>`;
        });
    return false; //to block from loading a new page
}


$(document).ready(function () {
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
    /* Initialization of the modal trigger taken from https://materializecss.com/modals.html#! */
    $('.modal').modal();
    /* Initialization of the tool tip taken from https://materializecss.com/tooltips.html */
    $('.tooltipped').tooltip();
});