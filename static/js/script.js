// API baseURL
// const baseURL = "https://www.googleapis.com/books/v1/volumes?q=intitle:foundation+inauthor:asimov+isbn:9780586017135&printType=books&key=AIzaSyDR3pb09aEo_zdemgtte5eM0eLsHFNXmVI"; 
const baseURL = "https://www.googleapis.com/books/v1/volumes?q=";
const key = "&printType=books&key=AIzaSyDR3pb09aEo_zdemgtte5eM0eLsHFNXmVI";

//AIzaSyDR3pb09aEo_zdemgtte5eM0eLsHFNXmVI

function getData(title, author, cb){
    let xhr = new XMLHttpRequest();
    let bookTitle = "intitle:" + title;
    let bookAuthor = "+inauthor:" + author;
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
    let el = document.getElementById("bookContentContainer");
    // Sets the page back to blank every time the button is clicked.
    el.innerHTML = "";
    let img = document.getElementById("bookCoverContainer");
    img.innerHTML = "";

    getData(title, author, function(data){

        // data is an object
        // it has items, data.items
        // data.items is an array of book objects
        // each book object has a bunch of properties, such as volumeInfo, searchInfo

        books = data.items;
        firstBook = books[0]; // data.items[0] is the first book
        let thumbnail = books[0]["volumeInfo"]["imageLinks"]["thumbnail"];
        let title = books[0]["volumeInfo"]["title"];
        let author = books[0]["volumeInfo"]["authors"];
        let genre = books[0]["volumeInfo"]["categories"][0];
        let description = books[0]["volumeInfo"]["description"];
        let publisher = books[0]["volumeInfo"]["publisher"];
        let publishedDate = books[0]["volumeInfo"]["publishedDate"];
        let pageCount = books[0]["volumeInfo"]["pageCount"];
        let isbn = books[0]["volumeInfo"]["industryIdentifiers"][0]["identifier"];

        // Print data to console
        console.log(data);
        // Print data to screen
        img.innerHTML += "<img src='" + thumbnail + "' class='center'>";

        el.innerHTML += "<table><tr><td>Title:</td><td> " + title + "</td></tr>" +
        "<tr><td>Author:</td><td>" + author + "</td></tr>" +
        "<tr><td>Genre:</td><td>" + genre + "</td></tr>" +
        "<tr><td>Description:</td><td>" + description + "</td></tr>" +
        "<tr><td>Publisher:</td><td>" + publisher + "</td></tr>" +
        "<tr><td>Date Published:</td><td>" + publishedDate + "</td></tr>" +
        "<tr><td>Page Count:</td><td>" + pageCount + "</td></tr>" +
        "<tr><td>ISBN:</td><td>" + isbn + "</td></tr></table>";
    })
}


// function saveDetail(){

//     var name = $("#inputFirstname").val();
//     var from = $("#sourceZone1").val();
//     var to = $("#destinationZone1").val();
//     var source = $("#sourceaddress").val();
//     var destination = $("#destinationaddress").val();
//     var srcTranslationType = $("#combo").val();
//     var srcTranStaticIpTransAddr = $("#inputAddressLine5").val();

//     var jsonToSend = {
//         name: name,
//         from: from,
//         to: to,
//         source: source,
//         destination: destination,
//         srcTranslationType: srcTranslationType,
//         srcTranStaticIpTransAddr: srcTranStaticIpTransAddr

//     };
//     $.ajax({
//         type: "POST",
//         contentType: "application/json",
//         url: "../policy/nat?id=" + id,
//         data: JSON.stringify(sendInfo),
//         success: function(data) {
//         alert("Successfully added information");

//         },
//         error: function(error) {
//         alert("Error while Adding Detail...");
//         }
//     });

// }


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
