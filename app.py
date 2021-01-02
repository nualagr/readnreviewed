import os
import datetime
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
if os.path.exists("env.py"):
    import env


app = Flask(__name__)
# Grab the database name
app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
# Configure the actual connection string
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
# Grab our secret key
app.secret_key = os.environ.get("SECRET_KEY")
# Grab our emailjs key
app.email_key = os.environ.get("EMAIL_KEY")


# Set up an instance of PyMongo.
# Add the app into that using the constructor method.
mongo = PyMongo(app)


BOOK_REVIEW_LIMIT = 2


def https_url_for(*args, **kwargs):
    """
    Function to ensure that the wrapped url_for call is external and
    therefore uses the full url and that that url is https not http.
    """
    return url_for(_scheme='https', _external=True, *args, **kwargs)


def render_book_template(book_id):
    """
    Function to find a specific book in the database,
    to locate the associated reviews (sorted by
    score and date), to create the purchase url and to
    check whether the user has saved the book to their
    wishlist.
    """
    # Find the book document in the database
    this_book = mongo.db.books.find_one(
        {"_id": ObjectId(book_id)}
    )
    # Find the reviews that relate to that book
    this_book_reviews = list(mongo.db.reviews.find(
        {"book_id": ObjectId(book_id)})
    )
    # Sort by review score and then by date added
    sorted_book_reviews = sorted(
        this_book_reviews, key=lambda b: (
            -b['review_score'], -b['review_date']))

    # Create the book purchase url
    # by adding the book title and author to the url
    this_book_title = this_book["title"].replace(" ", "+")
    this_book_author = this_book["authors"][0].replace(" ", "+")
    book_purchase_url = (
        "https://www.amazon.com/s?tag=falsetag&k=" +
        this_book_title + " " + this_book_author)

    # Create a list of users who have reviewed this book already
    reviewers = []
    # Convert floats to datetime format in each book review
    for book_review in this_book_reviews:
        book_review["review_date"] = datetime.datetime.fromtimestamp(
            book_review["review_date"]).strftime("%a, %b %d, %Y")
        # Add reviewers to the reviewers list
        reviewers.append(book_review["created_by"])

    bookmark = False
    purchase = False

    # If the session cookie exists then the user is logged in
    if session:
        # Grab the session user's wishlist from the database
        wishlist = mongo.db.users.find_one(
            {"username": session["user"]})["wishlist"]

        # Check to see whether the current user
        # has already saved this book to their wishlist
        # If so, remove the bookmark
        if (this_book["_id"] in wishlist):
            bookmark = True

        # Check and see whether the current user has reviewed this book
        if (session["user"] not in reviewers):
            purchase = True

    return render_template(
        "view_book.html", this_book=this_book,
        this_book_reviews=sorted_book_reviews,
        book_purchase_url=book_purchase_url,
        reviewers=reviewers, bookmark=bookmark, purchase=purchase)


@app.errorhandler(404)
@app.route("/404")
def page_not_found(e):
    """
    Function to set the 404 status explicitly
    and display the custom 404.html page.
    """
    return render_template("404.html"), 404


@ app.errorhandler(500)
def internal_server(error):
    return render_template("500.html"), 500


@app.route("/")
@app.route("/get_books")
def get_books():
    """
    Function to find the two latest reviews in the database,
    sorted by date descending. Find the first two reviews on
    the list that do not relate the same book. Find the
    associated book information and display on the home page.
    """
    # Sort the reviews by date descending to find the latest reviews
    reviews = list(mongo.db.reviews.find().sort("review_date", -1))
    latest_reviewed_books = []
    reviewed_book_ids = []
    # Simplification of code suggested by Mr. Reuben Ferrante
    for review in reviews:
        if review["book_id"] not in reviewed_book_ids:
            book = mongo.db.books.find_one(
                {"_id": ObjectId(review["book_id"])})
            latest_reviewed_books.append(book)
            reviewed_book_ids.append(review["book_id"])
            if len(latest_reviewed_books) >= BOOK_REVIEW_LIMIT:
                break
    return render_template("index.html", books=latest_reviewed_books)


@app.route("/browse")
def browse():
    """
    Function to find all the books in the database and sort by
    date published, newest to oldest. Display each on browse page.
    """
    books = list(mongo.db.books.find().sort("published_date", -1))
    return render_template("browse.html", books=books)


@app.route("/contact", methods=["GET", "POST"])
def contact():
    return render_template("contact.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        # Check if username already exists in the database.
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()}
        )

        if existing_user:
            flash("Username Already Registered")
            return redirect(https_url_for("register"))

        # Check if email address is in the database already
        existing_email = mongo.db.users.find_one(
            {"email": request.form.get("email").lower()}
        )

        if existing_email:
            flash("Email address already registered")
            return redirect(https_url_for("register"))

        register = {
            "username": request.form.get("username").lower(),
            "password": generate_password_hash(
                request.form.get("password")),
            "email": request.form.get("email").lower(),
            "wishlist": []
        }

        # Insert the dictionary into the database.
        mongo.db.users.insert_one(register)

        # Put the new user into the 'session' cookie
        session["user"] = request.form.get("username").lower()
        flash("Registration Successful")
        return redirect(https_url_for("profile", username=session["user"]))

    return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        # Check if username exists in db
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            # Ensure hashed password matches user input
            if check_password_hash(
                    existing_user["password"], request.form.get("password")):
                session["user"] = request.form.get("username").lower()
                flash("Welcome back {}".format(
                    request.form.get("username")))
                return redirect(https_url_for(
                    "get_books"))
            else:
                # Invalid password match
                flash("Incorrect Username and/or Password.")
                return redirect(https_url_for("login"))

        else:
            # Username doesn't exist
            flash("Incorrect Username and/or Password.")
            return redirect(https_url_for("login"))

    return render_template("login.html")


@app.route("/profile/<username>", methods=["GET", "POST"])
def profile(username):
    # Grab the session user's username and email address from the database
    username = mongo.db.users.find_one(
        {"username": session["user"]})["username"]
    email = mongo.db.users.find_one(
        {"username": session["user"]})["email"]

    # If the session cookie exists
    # then the user is logged in so open the profile page
    if session["user"]:
        return render_template("profile.html", username=username, email=email)

    # If the session cookie does not exist
    # then bring the user to the login page
    return redirect(https_url_for("login"))


@app.route("/edit_profile/<username>", methods=["GET", "POST"])
def edit_profile(username):
    # Grab the session user's username and email address from the database
    user = mongo.db.users.find_one(
        {"username": username})
    email = mongo.db.users.find_one(
        {"username": session["user"]})["email"]

    if request.method == "GET":
        # If the session cookie exists
        # then the user is logged in so open the edit profile page
        if session["user"]:
            return render_template(
                "edit_profile.html", username=username, email=email)

        # If the session cookie does not exist
        # then bring the user to the login page
        return redirect(https_url_for("login"))

    if request.method == "POST":
        # Ensure hashed password matches user input
        if check_password_hash(
                user["password"], request.form.get("currentPassword")):
            new_password = generate_password_hash(
                request.form.get("newPassword"))
            mongo.db.users.update_one(
                {"username": username},
                {"$set": {"password": new_password}})
            flash("Password Updated")
            return redirect(https_url_for("profile", username=session["user"]))
        else:
            flash("Password Incorrect")
            return redirect(https_url_for("profile", username=session["user"]))


@app.route("/logout")
def logout():
    # Remove user name from Session Cookie loggin them out
    flash("You have been logged out.")
    session.pop("user")
    return redirect(https_url_for("login"))


@app.route("/add_book", methods=["GET", "POST"])
def add_book():
    """
    Function to find take the fetch API post from script.js.
    Add the book to the database.
    Return the url for the view_book page for the new book.
    """
    if request.method == "POST":
        # Unpack json into a dict
        newBook = request.json
        print(
            "This is the newBook coming to you from Python add_book.html",
            newBook)
        print("This is the new book title:", newBook["title"])

        # Add new book to the database
        mongo.db.books.insert_one(newBook)
        book_id = mongo.db.books.find_one({
            "title": newBook["title"]
        })["_id"]
        print(book_id)
        return redirect(https_url_for("view_book", book_id=book_id))

    if request.method == "GET":
        return render_template("add_book.html")


@app.route("/view_book/<book_id>")
def view_book(book_id):
    return render_book_template(book_id)


@app.route("/my_review/<book_id>")
def my_review(book_id):
    # Find the book document in the database
    this_book = mongo.db.books.find_one(
        {"_id": ObjectId(book_id)}
    )
    # Find the reviews that relate to that book
    # Isolate the current user's review
    my_review = mongo.db.reviews.find_one(
        {"book_id": ObjectId(book_id),
            "created_by": session["user"]})

    # Convert float to datetime format in book review
    my_review["review_date"] = datetime.datetime.fromtimestamp(
        my_review["review_date"]).strftime("%a, %b %d, %Y")

    return render_template(
        "my_review.html", this_book=this_book,
        my_review=my_review,)


@app.route("/add_review/<book_id>", methods=["GET", "POST"])
def add_review(book_id):
    # Use the book_id that was passed in to find the book in the database
    this_book = mongo.db.books.find_one(
        {"_id": ObjectId(book_id)}
    )
    book_id = this_book['_id']

    if request.method == "POST":
        # Grab the date
        e = datetime.datetime.now()
        # Convert it to seconds
        # so that the review times can be compared and sorted easily
        seconds = e.timestamp()

        # Create the review dict to submit to the database
        review = {
            "book_id": book_id,
            "rating": request.form.get("rating"),
            "review": request.form.get("review"),
            "created_by": session["user"],
            "review_date": seconds,
            "review_score": 0,
            "upvoters": [],
        }
        # Insert the review into the database
        mongo.db.reviews.insert_one(review)
        flash("Review Successfully Added")
        return render_book_template(book_id)

    if request.method == "GET":
        return render_template(
            "add_review.html", book_id=book_id, this_book=this_book,)


@app.route("/upvote_review/<review_id>", methods=["POST"])
def upvote_review(review_id):
    review = mongo.db.reviews.find_one({
        "_id": ObjectId(review_id)
    })

    if request.method == "POST":
        print("upvoting review", review_id)
        mongo.db.reviews.update_one(
            {"_id": ObjectId(review_id)},
            {"$inc": {"review_score": 1},
                "$addToSet": {"upvoters": session["user"]}}
        )
        print("getting book id")
        # book_id = ObjectId(review['book_id'])
        print("returning book page")
        return render_book_template(review['book_id'])


@app.route("/edit_review/<book_id>/<review_id>", methods=["GET", "POST"])
def edit_review(book_id, review_id):
    # Find this review in the reviews collection in the database
    this_review = mongo.db.reviews.find_one(
        {"_id": ObjectId(review_id)}
    )
    # Find the book document in the database
    this_book = mongo.db.books.find_one(
        {"_id": ObjectId(book_id)}
    )

    if request.method == "POST":
        # Grab the date
        e = datetime.datetime.now()
        # Convert it to seconds
        seconds = e.timestamp()

        # Create a new dictionary to submit to Mongodb
        # to overwrite the current review
        submit = {"$set": {
            "rating": request.form.get("rating"),
            "review": request.form.get("review"),
            "review_date": seconds,
            "review_score": 0,
            "upvoters": [],
            }
        }
        mongo.db.reviews.update_one({"_id": ObjectId(review_id)}, submit)
        flash("Review Successfully Updated")
        return render_book_template(book_id)

    if request.method == "GET":
        return render_template(
            "edit_review.html", this_book=this_book, this_review=this_review)


@app.route("/delete_review/<book_id>/<review_id>")
def delete_review(book_id, review_id):
    this_review = mongo.db.reviews.find_one({"_id": ObjectId(review_id)})
    mongo.db.reviews.delete_one(this_review)
    flash("Review Successfully Deleted")
    return render_book_template(book_id)


@app.route("/my_reviews")
def my_reviews():
    current_user = session["user"]
    # Get list of all reviews by this user and sort by date added
    my_reviews = list(
        mongo.db.reviews.find(
            {"created_by": current_user}).sort("review_date", -1))
    if my_reviews == []:
        flash("No reviews posted. ")
        flash(
            "Search for the book you wish to review and "
            "share your thoughts with the Read n' Reviewed community.")
        return render_template(
            "my_reviews.html", books_and_reviews=my_reviews)
    else:
        # Convert floats to datetime format in each book review
        for book_review in my_reviews:
            book_review["review_date"] = datetime.datetime.fromtimestamp(
                book_review["review_date"]).strftime("%a, %b %d, %Y")
        list_of_books_and_reviews = []
        for review in my_reviews:
            # Find the book document relating to the review
            corresponding_book = mongo.db.books.find_one(
                {"_id": review['book_id']})
            # Combine the review and book into one dictionary
            book_and_review = dict(
                list(corresponding_book.items()) + list(review.items()))
            # Add to list of books and reviews to be passed to the template
            list_of_books_and_reviews.append(book_and_review)
        return render_template(
            "my_reviews.html", books_and_reviews=list_of_books_and_reviews)


@app.route("/wish_list")
def wish_list():
    wishlist = list(mongo.db.users.find_one(
        {"username": session["user"]})["wishlist"])
    # If the user has no saved books yet
    if (wishlist == []):
        flash("No books saved.")
        flash("Click on a bookmark to save a book to your Wish List.")
        return redirect(https_url_for("browse"))
    # If the user has saved books to their wishlist
    else:
        booklist = []
        for book_id in wishlist:
            # Find the book document in the database
            this_book = mongo.db.books.find_one(
                {"_id": ObjectId(book_id)}
            )
            # Create the book purchase url
            # by adding the book title and author to the url
            this_book_title = this_book["title"].replace(" ", "+")
            this_book_author = this_book["authors"][0].replace(" ", "+")
            book_purchase_url = (
                "https://www.amazon.com/s?tag=falsetag&k=" +
                this_book_title + " " + this_book_author)
            this_book["book_purchase_url"] = book_purchase_url
            # Add the book to the booklist list
            booklist.append(this_book)
    return render_template(
        "wish_list.html", booklist=booklist)


@app.route("/bookmark/<book_id>", methods=["GET", "POST"])
def mark(book_id):
    if request.method == "POST":
        mongo.db.users.update_one(
            {"username": session["user"]},
            {"$addToSet": {"wishlist": ObjectId(book_id)}}
        )
        flash("Book Saved to Wish List")
        return render_book_template(book_id)


@app.route("/unmark/<book_id>", methods=["GET", "POST"])
def unmark(book_id):
    if request.method == "POST":
        mongo.db.users.update_one(
            {"username": session["user"]},
            {"$pull": {"wishlist": ObjectId(book_id)}}
        )
        flash("Book Removed from Wish List")
        return redirect(https_url_for("wish_list"))


@app.route("/search", methods=["GET", "POST"])
def search():
    if request.method == "POST":
        query = request.form.get("query")
        books = list(mongo.db.books.find({"$text": {"$search": query}}))
        print("This is the books result: ", books)
        if session:
            if books == []:
                flash("The requested book has not yet been reviewed.")
                flash("Fill in the form below to add the book to the site.")
                return render_template("add_book.html")
            else:
                return render_template("search.html", books=books)
        else:
            if books == []:
                flash("No result found.")
                flash(
                    "Join our community and be the first to review this book.")
                return render_template("search.html", books=[])
            else:
                return render_template("search.html", books=books)

    return render_template("search.html", books=[])


@app.route('/success')
def success():
    return 'Success'


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"), port=int(
        os.environ.get("PORT")), debug=True)
