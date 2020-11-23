<h1 align="center">Read n' Reviewed</h1>

![alt text](documentation/readme-images/amiresponsive-mockup.png "Mockup of Read n' Reviewed index.html page when viewed on a desktop, tablet and mobile device.")
<sub>*Created using* [Am I Responsive](http://ami.responsivedesign.is/)</sub>
<br>

Read ‘n Reviewed is a fictitious book recommendation website. 
This is a community-lead site on which members can share their book reviews with a view to helping others choose the perfect book to read next.

The site is geared towards avid readers.  Membership of the site provides users with the ability to contribute to the site by writing reviews, 
which can subsequently be edited or deleted, up-voting other members’ reviews, as well as providing users with a range of helpful tools including 
the ability to save books to a Wish List and providing them with links to online stores where their desired book can be purchased.

This project is the third of four Milestone Projects that make up the Full Stack Web Development Program at The Code Institute, the main requirements 
of which were to make a full-stack site that allows users to manage a common dataset about a particular domain using [HTML5](http://en.wikipedia.org/wiki/HTML5), 
[CSS3](http://en.wikipedia.org/wiki/CSS), [JavaScript](https://en.wikipedia.org/wiki/JavaScript), the JavaScript library [jQuery](https://jquery.com/)
, [Python](https://en.wikipedia.org/wiki/Python_(programming_language)), [Flask](https://en.wikipedia.org/wiki/Flask_(web_framework)) and the document-oriented database program
, [MongoDB](https://en.wikipedia.org/wiki/MongoDB).


Click <a href="">here</a> to visit the site.
<br>

## **Table of Contents**
1. [**User Experience (UX)**](#ux)
    - [Project Goals](#project-goals)
    - [User Stories](#user-stories)
        - [Prospective Site Member](#prospective-site-member)
        - [Existing Site Member](#existing-site-member)
        - [The Lord of the Rings Fan](#the-lord-of-the-rings-fan)
        - [Site Owner](#site-owner)
2. [**User Centered Design**](#user-centered-design)
    - [1) The Strategy Plane](#1-strategy-plane)
    - [2) The Scope Plane](#2-scope-plane)
    - [3) The Structure Plane](#3-structure-plane)
         - [Features](#features)
    - [4) The Skeleton Plane](#4-skeleton-plane)
        - [Wireframes](#wireframes)
    - [5) The Surface Plane](#5-surface-plane) 
        - [Design](#design)
        - [Colour Scheme](#colour-scheme)
        - [Icons](#icons)
        - [Typography](#typography)
3. [**Development**](#development)
    - [Information Architecture](#information-architecture)
        - [Data Storage Types](#data-storage-types)
        - [Collections Data Structure](#collections-data-structure)
4. [**Technologies Used**](#technologies-used)
5. [**Testing**](#testing)
    - [Performance](#performance)
    - [Responsiveness](#responsiveness)
    - [Tested User Stories](#tested-user-stories)
    - [Bugs](#bugs)
6. [**Deployment**](#deployment)
7. [**Credits**](#credits)
    - [Content](#content)
    - [Media](#media)
    - [Acknowledgements](#acknowledgements)

<br>

---

## UX
This section provides insight into the UX process, focusing on who Read ‘n Reviewed was created for, the main aims of the 
project and how the website can help users meet their needs.

Read n’ Reviewed is of direct interest to avid readers, who are the target market for its services.  The site seeks to 
provide them with a range of book recommendations by fellow readers enabling them to make more informed choices when choosing 
their next book to read.  As a site with many readers Read n’ Reviewed may also have commercial value for online book stores and for 
the site owner who seeks to gain financially from the direct referral of members to those stores to purchase their next book.  

### Project Goals
The goals of this project are to:
-	Make Read ‘n Reviewed appear to be a reputable website by creating a professional and intuitive interface.
-	Create a website that is visually appealing and fully responsive on all devices and screen sizes.
-	Present information about the Read ‘n Reviewed site so that visitors immediately comprehend what service it provides to its members. 
-	Allow visitors to easily contact the website administrator with any questions.
-	Encourage new members to sign up to the site.
-	Create an interactive website where a community of engaged readers can share their book reviews on the site.
-	Provide users with the functionality so that they can create, read, update and delete their own content.
-	Store the users’ data so that it is can be accessed when required.
-	Encourage members to up-vote other members’ reviews that they believe are helpful or that accurately reflect the nature of the book being reviewed.
-	Provide members with direct links to the books they desire in an online book store.

### User Stories

#### Prospective Site Member

I am a prospective Read n’ Reviewed site member I want to be able to:

-	Immediately comprehend the purpose behind the Read n’ Reviewed site.
-	Easily find information outlining the features that it offers to registered members.
-	Read site members’ testimonials.
-	Read some book review samples.
-	Easily contact the site owner if I have any questions about the site.
-	Easily locate any social media accounts connected to the site.
-   Navigate through the site with ease.
-	Easily register to become a site member.

#### Existing Site Member

I am an existing Read n’ Reviewed site member I want to be able to:

-	Log in to the site.
-   Navigate through the site with ease.
-	Log out of the site.
-	Edit my account information.
-	Read the most recent book reviews added to the site, which will give me an idea of what books are being read by other site members right now.
-	Search for my next book to read based on reviews written by fellow book lovers, reviews that are ranked by popularity.
-	Read general information about the books, including the authors’ names and the publication dates as well as being able to see images of the book covers.
-	Be facilitated in my goal of buying a specific book immediately through direct links to an online book store.
-	Search to see whether a book has already been reviewed on the site by entering the book title, or author into a search box within the site.
-	Search for books by genre by entering the desired genre into a search box within the site.
-	Share my own book reviews with fellow readers.
-	Input my own review easily into a user-friendly form that is straightforward to use. 
-	Edit or delete my own book reviews.
-	Be secure in the knowledge that no other user can edit or delete my reviews.
-	Be secure in the knowledge that measures have been put in place to prevent me from accidentally deleting one of my own reviews.
-	Up-vote other members’ reviews that I feel are helpful and accurately reflect the book being reviewed.
-	Curate my own Wish List of books that I would like to read in the future.
-	See a list of my own book reviews on the site.
-	Contact the site owner.


#### Site Owner
As the owner of Read n' Reviewed website I would like:

-	Provide site members with an effective and user-friendly platform where they can read book reviews written by other avid readers so that they make more informed choices when choosing their next book to read.
-	Provide site members with a user-friendly way to share their own reviews of books, edit those reviews or delete them as they see fit.
-	Present the reviews in a visually appealing format.
-	Provide an up-voting functionality for members to express their satisfaction with particular reviews.
-	Provide site members with the ability to search the site for a specific book by entering the title or the author into a search box within the site.
-	Provide users with general information about the books reviewed, including the author’s name and publication date and an image of the book cover.
-	Raise revenue by directing site members to a partner online book store where they can buy the books they are interested in.
-	Encourage more members to join the community by creating a professional-looking website that is intuitive to use and displays positive member testimonials on the landing page. 
-	Provide prospective members with the ability to sign-up easily.
-	Encourage more visitors to follow the site on social media and thereby raise the profile of the site.
-	Provide visible contact details so that all site visitors can contact the site administrator with ease.
-	Search for my next book to read based on reviews written by fellow book lovers.

<br>

##### back to [top](#table-of-contents)
---

## User Centered Design
### 1 Strategy Plane

The main goals of the website include attracting new members to sign up to the site and encouraging existing members to upload book reviews and recommend books to 
the community in order to increase participation on the site and ultimately raise revenue from the partner book stores where members are encouraged to buy their books 
through the provision of direct links. The website is a Business to Consumer model aimed at a literary conscious audience. It should include minimal, relevant, 
content displayed in an attractive and intuitive manner. The UX process started with the creation of the User Stories above which helped to maintain a focus on user needs 
and business goals during the design process.  

<br>

##### back to [top](#table-of-contents)
---

### 2 Scope Plane

The key features of the website were developed based on user needs. 

Users should be able to do the following on the website:

-	Find out information about the site’s services.
-	Learn about the benefits of becoming a member.
-	Read testimonials written by site members.
-	Contact the site administrator with a question.
-	Easily access the site’s social media channels.
-	Learn more about the site and its ethos.
-	Sign up to become a member.
-	Log in to the site.
-	Log out of the site.
-	Upload a book review for a book that hasn’t yet been reviewed on the site.
-	Upload a book review for a book that has already been reviewed on the site.
-	View their own book reviews.
-	Edit their own book reviews.
-	Delete their own book reviews.
-	View other members’ book reviews.
-	Up-vote other members’ book reviews.
-	Create and curate their own Wish List of books that they want to read.
-	Search the site for a book by title, author or genre.
-	Follow a link directly to an online store that sells the book in question.


<br>

##### back to [top](#table-of-contents)
---

### 3 Structure Plane
After identifying the needs of the site's users and after visiting book review and recommendation websites the following website design and features were chosen:

For ease of navigation there will be a navigation bar at the top with the brand logo and links to other pages on the site.  
This will collapse into the hamburger icon when viewed on a mobile or tablet screen.  
There will also be a common footer on each page with social media links, site administrator contact details and copyright information.
The site is going to have different options for each of the following users: new visitors, site members and administrative users.  

1. **New visitors** to the site will be able to see the public landing page which will have three buttons on the navigation bar: Home, Log In and Register.  
   -	The Log In page will consist of a simple form asking for the member’s username and password.
   -	The Registration page will consist of a simple form asking the visitor to enter their email address, a username and a password.
   -	The Home page or Landing page will explain what membership to the site offers its users, it will display positive site member testimonials and sample latest book reviews uploaded to the site.


2. **Site members** will be able to log in to the site from the landing page.  Their logged in navigation bar will consist of:
   -	A link to their Profile page which displays their username and a list of the reviews they have contributed to the site. Edit and Delete buttons will be provided beside these reviews allowing the user to curate their own reviews. 
   -	A link to the New Review page consisting of a form where they can input their new review and submit it to the database.  
   -	A Wish-List page which consists of a bookshelf of book covers, that the member has earmarked for future reading. These cover images are links to those books as they have been reviewed on the site. 
   -	A Log Out button.


3. **Administrative Users** will be able to see the public site:
   -	Landing Page
   -	Log In Page
   -	Log Out button
   -	Registration Page
   -	Administrator Profile Page
   -	New Review Page
   -   Edit Review Page
   -	Wish-List Page

<br>

### Features

This is a multi-page site.  

<br>

### Existing Features
Consistent features across all pages:

A book **favicon**, displayed on the web browser's tab allows the user to identify the website by sight.

The **Title**, displayed on the web browser's tab at all times, clearly identifies the site as a book review website.

**Search box**  - located just below the navigation bar on the desktop and mobile view this feature allows users to search the entire site for a specific book by title or by author without having to click on a separate button or tab.

**Logo/Home button** - Visible at all times, this feature foregrounds the website's brand and allows the user to navigate back to the home page without requiring an extra click.

**User Icon button** - Visible at all times, this feature allows users to view their profile or login or out of the site.

A **footer** contains a link to the **About** section on the landing page that explains the website's ethos, a link to the **Contact Us** page 
so that users can contact the site administrator and **social media** links to:

- [Facebook](https://www.facebook.com)
- [Twitter](https://twitter.com)
- [Istagram](https://www.instagram.com) 

<br> 

### Features Left to Implement
-	Provide users with **individualised recommendations** based on their previous reviews and upvoting behaviour.
-	A **membership ezine** based on activity on the site – most popular books in different genres etc.


<br>

##### back to [top](#table-of-contents)
---

### 4 Skeleton Plane

The UI wireframing tool, [Balsamiq](https://balsamiq.com/) was used to create wireframes for each page as they will appear on desktop, tablet and mobile devices.
Main content areas were expressed in similar ways, to create consistency.  

After visiting existing book review sites including [GoodReads](https://www.goodreads.com/), [BookPage](https://bookpage.com/), 
[LoveReading](https://www.lovereading.co.uk/), [SFBook Reviews](https://sfbook.com/) and [Reedsy Discovery](https://reedsy.com/discovery), 
it was deemed necessary to place a search box under the navigation menu on all screens. 
On mobile view this will remain hidden unless the user clicks on the magnifying glass icon on the navbar so that the screen remains uncluttered.  
It was also deemed necessary to include a user icon on the top left of the navbar.
The prioritisation of these function, through their placement outside of the collapsible menus on the competitor sites, indicates that these 
functions are the most commonly used, or desired, by book review site users.  


<br>

#### Wireframes

- [Home Page](https://github.com/nualagr/readnreviewed/blob/master/documentation/wireframes/home.png)
![alt text](documentation/wireframes/home.png "Home Page.")

- [Login Page](https://github.com/nualagr/readnreviewed/blob/master/documentation/wireframes/login.png)
![alt text](documentation/wireframes/login.png "Login Page.")

- [Registration Page](https://github.com/nualagr/readnreviewed/blob/master/documentation/wireframes/register.png)
![alt text](documentation/wireframes/register.png "Registration Page.")

- [Contact Page](https://github.com/nualagr/readnreviewed/blob/master/documentation/wireframes/contact.png)
![alt text](documentation/wireframes/contact.png "Contact Page.")

- [User Profile](https://github.com/nualagr/readnreviewed/blob/master/documentation/wireframes/profile.png)
![alt text](documentation/wireframes/profile.png "User Profile Page.")

- [Browse Page](https://github.com/nualagr/readnreviewed/blob/master/documentation/wireframes/browse.png)
![alt text](documentation/wireframes/browse.png "Browse Page.")

- [Individual Book Review Page](https://github.com/nualagr/readnreviewed/blob/master/documentation/wireframes/book-review.png)
![alt text](documentation/wireframes/book-review.png "Individual Book Review Page.")

- [New Review Page](https://github.com/nualagr/readnreviewed/blob/master/documentation/wireframes/new-review.png)
![alt text](documentation/wireframes/new-review.png "New Review Page.")

- [Edit Review Page](https://github.com/nualagr/readnreviewed/blob/master/documentation/wireframes/edit-review.png)
![alt text](documentation/wireframes/edit-review.png "Edit Review Page.")

- [Wish List Page](https://github.com/nualagr/readnreviewed/blob/master/documentation/wireframes/wish-list.png)
![alt text](documentation/wireframes/wish-list.png "Wish List Page.")


<br>

##### back to [top](#table-of-contents)
---

### 5 Surface Plane

#### Design

The perceived audience for the Read n’ Reviewed site are avid readers. 
They are busy people who do not want to waste their time and money buying books that don’t fulfil their needs or desires. 
They want to make informed choices about their reading material.  They want to read unbiased opinions. 
They also want a handy location to save a list of the books they want to read/purchase next. 
Users who are more likely to want to keep a digital copy of their Wish List and who want to purchase books online are likely to be mobile users
, therefore a mobile-first approach was adopted when it came to designing the site.

#### Colour Scheme
To keep the visual design simple and modern a white background was used for the site.  
This design follows that of similar competitors including [BookPage](https://bookpage.com/), 
[LoveReading](https://www.lovereading.co.uk/), [SFBook Reviews](https://sfbook.com/) and [Reedsy Discovery](https://reedsy.com/discovery).  
Colour on these sites is limited to the use of one or two accent colours.  
This simple colour scheme allows the featured book covers to stand out and to grab the user’s attention. A 
similar approach was adopted on the Read n' Reviewed site. The accent colours of cyan and saffron were chosen.

![alt text](documentation/readme-images/readnreviewed-colour-palette.png "Read n' Reviewed colour palette.")

<br>

To make it easier to scan the page for information the user might need, the complimentary accent colours of cyan and saffron, 
which are found in the site logo, were used to draw attention to links and call-to-action buttons.  

<br>

![alt text](documentation/readme-images/blue-orange-book-logo.png "Read n' Reviewed logo.")

-	To keep the design clean, and professional the navigation bar will be #FFFFFF, white, matching the background of the body each page. 
-	The background colour of site will be #FFFFFF, white, to keep the website’s image clean and to provide easy contrast.
-	#CCCCCC, light gray, will be used to indicate changes in content areas or for horizontal dividers between sections.
-	When a user scrolls over navigation links a grey line will appear below the link being hovered over.  The line will change to blue when the link is active.  
-	The footer will be light gray, #CCCCCC, with eerie black, #222222, text.  To provide visual feedback to the user the social media and other links in the footer will turn blue when hovered over. 
-	Deep Saffron, #F69222, will be used as an accent colour throughout the site, from the logo to horizontal lines between sections, to call-to-action buttons.
-	Ochre, #BF7218, will be used for the books star ratings.
-	Text colour throughout the site will be Eerie Black (#222222) which a strong contrast to the other colours in the site.  The use of this colour ensures that the text should be legible and meet accessibility standards regardless of the background colour of the element in question.

#### Icons

As there is a lot of text within the site content it was decided that self-explanatory icons would be utilised as buttons as much as possible to reduce 
the amount of reading necessary to operate the site.  
For example, a magnifying glass icon was used instead of a ‘Search’ button.   The icons used were taken from [Font Awesome](https://fontawesome.com/).

<br>

##### back to [top](#table-of-contents)
---

#### Typography
As the nature of the website involves reading reviews within the site it was necessary to choose a font that was easy to read on a screen.  
The two fonts chosen for the site were among the fourteen most legible fonts for reading online according to 
[Thrive](https://thrive.design/best-fonts-for-reading-easiest-to-read-online-design-fonts/).

The *Merriweather* font was chosen for as the main heading font.  

<br>

![alt text](documentation/readme-images/merriweather-font-example.png "Merriweather font example.")

This font was designed to be pleasant to read on screens.  

<br>
To ensure the readability of smaller text on a mobile screen Open Sans was chosen for the main text used within the body of the site.  
This font remains legible even when the typeface is small. 

<br>

![alt text](documentation/readme-images/open-sans-font-example.png "Open Sans font example.")

<br>



##### back to [top](#table-of-contents)
---

## Development

## Information Architecture

A SQL database structure would have been ideal for storing the data in this project, however one of the requirements for this project involved the use of MongoDB, a NoSQL, general purpose, document-based database.

### Data Storage Types
The types of data stored in MongoDB for this project are:
-	ObjectId
-	String
-	DateTime

### Collections Data Structure
Initially the data was broken up into five database collections: Users, Reviews, Books, Authors and Genres.
However after reading about normalization on [StackOverflow](https://stackoverflow.com/questions/24839147/is-it-needed-to-normalize-your-database-when-you-are-using-mongodb#:~:text=1%20Answer&text=Normalizing%20your%20data%20like%20you,between%20tables%20are%20relatively%20cheap.)
it was decided to combine the books, authors and genre collection into one. In that way 
the most common queries can be satisfied by querying two collections, Books and Reviews, even though this means that there will be some redundancy in the database.

The Read n’ Reviewed website relies on three database collections:


#### Users Collection
| Title	        |Key in db	    |form validation type	|Data type  |
| :------------ |:--------------| :---------------------|:--------- |
|User ID        |_id	        |None	                |ObjectId   |
|First Name	    |firstName	    |text, maxlength="40"   |string     |
|Last Name	    |lastName	    |text, maxlength="40"	|string     |
|Username	    |username	    |text, maxlength="40"   |string     |
|Email Address	|email	        |email, maxlength="40"  |string     |
|Password	    |password	    |text, maxlength="15"	|string     |

<br>

#### Books Collection
| Title	            |Key in db	    |form validation type	|Data type  |
| :------------     |:--------------| :---------------------|:--------- |
|Book ID            |_id            |None                   |ObjectId   |
|Title	            |title	        |text, maxlength="200"  |string     |
|Author First Name  |firstName      |text, maxlength="40"   |string     |
|Author Last Name   |lastName       |text, maxlength="40"   |string     |
|Genre              |genre          |dropdown               |string     |
|ISBN	            |isbn           |text, maxlength="17"   |string     |
|URL                |url            |url, maxlength="100"   |string     |

<br>

#### Reviews Collection			
| Title	        |Key in db	    |form validation type	|Data type  |
| :------------ |:--------------| :---------------------|:--------- |
|Review ID      |_id            |None                   |ObjectId   |
|Member ID      |_id            |None                   |ObjectId   |
|Book ID        |_id            |None                   |ObjectId   |
|Date           |date           |None	                |datetime   |
|Star Rating	|rating 	    |dropdown menu          |string     |
|Review vote    |upVote         |button                 |integer    |
<br>

##### back to [top](#table-of-contents)
---


## Technologies Used

- Languages: 

  * [HTML5](http://en.wikipedia.org/wiki/HTML5). Used to create the structure of the game page and the 404 page.
  * [CSS3](http://en.wikipedia.org/wiki/CSS). Used to add style to the website. 
  * [JavaScript](https://en.wikipedia.org/wiki/JavaScript). Used to create the dynamic, interactive elements of the website.
  * [Python](https://en.wikipedia.org/wiki/Python_(programming_language)).
  * [Jinja](https://en.wikipedia.org/wiki/Jinja_(template_engine)).  Used to simplify displaying data from the backend of this project smoothly and effectively in html.
  
- Websites
  * [Am I Responsive](http://ami.responsivedesign.is/). Used to create the mock-up image showing the site as it would behave when viewed on desktop, mobile and tablet devices. 
  * [Code Institute](https://codeinstitute.net/). Used to review concepts covered in preceding modules and walk-through projects. 
  * [Coolors](https://coolors.co/ffbe0b-fb5607-ff006e-8338ec-3a86ff). Used to analyse the film poster and choose a suitable colour scheme for the site.
  * [Font Awesome](https://fontawesome.com/). Used to source the free icons that were used for the social media links in the footer and for the mute, home and help buttons.
  * [Google Chrome Developer Tools](https://developers.google.com/web/tools/chrome-devtools). Used throughout the project to test the responsiveness of elements, to target and apply CSS styles during the design phase and to test the site's performance once built. 
  * [Google Fonts](https://fonts.google.com/). Used to choose and source the font used in the body of the site.
  * [Github](https://github.com/). Used to host the deployed site and used as a respository for all previous versions of the build.
  * [Gitpod](https://www.gitpod.io/). This online IDE was used to build and develop the website.
  * [jQuery](https://jquery.com/). This JavaScript library was used to traverse the DOM and used for dynamic event handling. 
  * [Slack](code-institute-room.slack.com). Used during development and testing to find the solutions to problems enountered.
  * [Stack Overflow](https://stackoverflow.com/). Used to search for the answers to problems encountered during the development and testing of the website.
  * [Vecteezy](https://www.vecteezy.com/vector-art/599621-book-reading-logo-and-symbols-template-icons). Used to source the site icon.
  * [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/validator). Used to validate the CSS file.
  * [W3C HTML Validation Service](https://validator.w3.org/). Used to validate the HTML files.

- Frameworks
  * [Materialize Framework](https://materializecss.com/). Used to structure the website layout and ensure that it was responsive on all devices.
  * [Flask](https://en.wikipedia.org/wiki/Flask_(web_framework)).  Python web framework.

- Database
  * [MongoDB](https://en.wikipedia.org/wiki/MongoDB), the document-oriented database program.  Used to store the users' information, book reviews and other data.

- APIs
  * [GoodReads API](https://www.goodreads.com/api/index). Used to source the book synopsis, author information and book covers.

- Apps:
  * [Balsamiq](https://balsamiq.com/). Used to create the project wireframes.
  * [Inkscape](https://inkscape.org/). Used to edit the Vecteezy svg.

##### back to [top](#table-of-contents)
---

## Testing

### Performance


##### back to [top](#table-of-contents)
---

### Responsiveness

##### back to [top](#table-of-contents)
---

### Tested User Stories

#### New User




#### General User




#### Site Owner

<br>

##### back to [top](#table-of-contents)
---

### Bugs

#### Remaining Issues

##### back to [top](#table-of-contents)
---

## Deployment



### Deployment Procedure Followed:




### To find the link to the newly deployed site:



### To clone the repository:




##### back to [top](#table-of-contents)
---

## Credits
### Content
- The [Materialize Navbar component](https://materializecss.com/navbar.html) was used and modified.

- The [Materialize Footer component](https://materializecss.com/footer.html) was used and modified.



### Media

### Images
- Book-reading-logo from [Vecteezy](https://www.vecteezy.com/vector-art/599621-book-reading-logo-and-symbols-template-icons) was used for the Read n' Reviewed site logo.
<br>


### Acknowledgements
- [Code Institue](https://codeinstitute.net/) and the very helpful tutors.
- Thank you to my project mentor [Reuben Ferrante](https://uk.linkedin.com/in/reuben-ferrante).
- The [Code Institue](https://codeinstitute.net/) community on [Slack](code-institute-room.slack.com) for their support.
- A special thank you to my partner Kevin for his patience and support throughout this project. 
- I received inspiration for this project from:
    - The [Code Institue](https://codeinstitute.net/) 'Task Manager' project.
    - [GoodReads](https://www.goodreads.com/)
    - [BookPage](https://bookpage.com/)
    - [LoveReading](https://www.lovereading.co.uk/)
    - [SFBook Reviews](https://sfbook.com/)
    - [Reedsy Discovery](https://reedsy.com/discovery)

<br>

##### back to [top](#table-of-contents)
---
