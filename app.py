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


# Set up an instance of PyMongo.
# Add the app into that using the constructor method.
mongo = PyMongo(app)


@app.route("/")
@app.route("/get_books")
def get_books():
    # Sort the reviews by date descending to find the latest reviews
    reviews = list(mongo.db.reviews.find().sort("review_date", -1))
    book_one_id = reviews[0]["book_id"]
    book_two_id = reviews[1]["book_id"]
    if book_one_id == book_two_id:
        book_two_id = reviews[2]["book_id"]
    book_one = mongo.db.books.find_one(
        {"_id": ObjectId(book_one_id)}
    )
    book_two = mongo.db.books.find_one(
        {"_id": ObjectId(book_two_id)}
    )
    return render_template("index.html", book_one=book_one, book_two=book_two)


@app.route("/browse")
def browse():
    books = list(mongo.db.books.find().sort("_id", 1))
    return render_template("browse.html", books=books)


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        # Check if username already exists in the database.
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()}
        )

        if existing_user:
            flash("Username Already Registered")
            return redirect(url_for("register"))

        # Check if email address is in the database already
        existing_email = mongo.db.users.find_one(
            {"email": request.form.get("email").lower()}
        )

        if existing_email:
            flash("Email address already registered")
            return redirect(url_for("register"))

        register = {
            "username": request.form.get("username").lower(),
            "password": generate_password_hash(
                request.form.get("password")),
            "email": request.form.get("email").lower()
        }

        # Insert the dictionary into the database.
        mongo.db.users.insert_one(register)

        # Put the new user into the 'session' cookie
        session["user"] = request.form.get("username").lower()
        flash("Registration Successful")
        return redirect(url_for("profile", username=session["user"]))

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
                flash("Welcome, {}".format(
                    request.form.get("username")))
                return redirect(url_for("profile", username=session["user"]))
            else:
                # Invalid password match
                flash("Incorrect Username and/or Password.")
                return redirect(url_for("login"))

        else:
            # Username doesn't exist
            flash("Incorrect Username and/or Password.")
            return redirect(url_for("login"))

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
    return redirect(url_for("login"))


@app.route("/logout")
def logout():
    # Remove user name from Session Cookie loggin them out
    flash("You have been logged out.")
    session.pop("user")
    return redirect(url_for("login"))


@app.route("/add_book", methods=["GET", "POST"])
def add_book():
    if request.method == "POST":
        # Unpack json into a dict
        newBook = request.json
        print(newBook)

        # Add new book to the database
        mongo.db.books.insert_one(newBook)
        # flash("New book Successfully Added")
        # return redirect(url_for("view_book", latest_book=newBook))
        return render_template("add_book.html")

    if request.method == "GET":
        return render_template("add_book.html")


@app.route("/view_book/<book_id>")
def view_book(book_id):
    this_book = mongo.db.books.find_one(
        {"_id": ObjectId(book_id)}
    )
    this_book_reviews = list(mongo.db.reviews.find(
        {"book_id": ObjectId(book_id)}).sort("review_date", -1)
    )
    this_book_title = this_book["title"].replace(" ", "+")
    print(this_book_title)
    book_purchase_url = "https://www.amazon.com/s?tag=faketag&k=" + this_book_title
    return render_template(
        "view_book.html", this_book=this_book,
        this_book_reviews=this_book_reviews, book_purchase_url=book_purchase_url)


@app.route("/add_review", methods=["GET", "POST"])
def add_review():
    if request.method == "POST":
        # Grab the date
        e = datetime.datetime.now()
        # Use the title input into the form to
        # Grab the book id in order to link the review to the correct book
        book = mongo.db.books.find_one({
             "title": request.form.get("title")
         })
        book_id = book['_id']

        # Create the review dict to submit to the database
        review = {
            "book_id": book_id,
            "rating": request.form.get("rating"),
            "review": request.form.get("review"),
            "created_by": session["user"],
            "review_date": e.strftime("%a, %b %d, %Y")
        }
        # Insert the review into the database
        mongo.db.reviews.insert_one(review)
        flash("Review Successfully Added")
    return render_template("add_review.html")


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"), port=int(
        os.environ.get("PORT")), debug=True)
