const myLibrary = [
    {
        title: "Rich dad poor dad",
        author: "Robert Kiyosaki",
        pages: 1000,
        readOrNot: "read",
        info: function() {
            return `${this.title} by ${this.author}, ${this.pages}, ${this.readOrNot}`;
        },
    },
    {
        title: "Rich dad poor dad",
        author: "Robert Kiyosaki",
        pages: 1500,
        readOrNot: "not read",
        info: function() {
            return `${this.title} by ${this.author}, ${this.pages}, ${this.readOrNot}`;
        },
    }
];

function Book(title, author, pages, readOrNot) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readOrNot = readOrNot;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages}, ${this.readOrNot}`;
    };
}

let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");

function addBookToLibrary() {
    let newBook = prompt("Please enter a book");
    let newBookArray = newBook.split(", ")
    let newBookObject = new Book(newBookArray[0], newBookArray[1], newBookArray[2], newBookArray[3]);
    myLibrary.push(newBookObject);
}

let libraryTable = document.querySelector('table');

function displayBooks() {
    for (const book of myLibrary) {
        console.log(book.info());
    }
}

displayBooks();