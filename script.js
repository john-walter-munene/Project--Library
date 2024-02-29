const myLibrary = [
    {
        title: "Rich dad poor dad",
        author: "Robert Kiyosaki",
        pages: 1000,
        readOrNot: "Read",
        info: function() {
            return `${this.title} by ${this.author}, ${this.pages}, ${this.readOrNot}`;
        },
    },
    {
        title: "Rich dad poor dad",
        author: "Robert Kiyosaki",
        pages: 1500,
        readOrNot: "Not read",
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

function addBookToLibrary(editIndex = null) {
    // Get user inputs from form.
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let readStatus = document.querySelector('input[name="read_status"]:checked').getAttribute('value');
    // If editing, update the existing book object.
    if (editIndex !== null) {
        myLibrary[editIndex].title = title;
        myLibrary[editIndex].author = author;
        myLibrary[editIndex].pages = pages;
        myLibrary[editIndex].readOrNot = readStatus;
    } else {
        // If adding a new book, create a new Book object and push it to the library.
        let newBookObject = new Book(title, author, pages, readStatus);
        myLibrary.push(newBookObject);
    }

    // Clear form.
    document.querySelector('#title').value = "";
    document.querySelector('#author').value = "";
    document.querySelector('#pages').value = "";
    document.querySelector('input[name="read_status"]:checked').checked = false;

    // Update the display after adding/editing a book.
    libraryTable.textContent = "";
    displayBooks();

    return;
}

let libraryTable = document.querySelector('.books');

function displayBooks() {
    for (const book of myLibrary) {
        //Create a new table row for each book
        let bookRow = document.createElement('tr');
        
        // Add a data attribute that corresponds to each item index.
        let bookIndex = myLibrary.indexOf(book);
        bookRow.setAttribute('data-book-number', bookIndex);
        
        // Create content holders in each row.
        let bookTitle = document.createElement('td');
        let bookAuthor = document.createElement('td');
        let bookPages = document.createElement('td');
        let bookStatus = document.createElement('td');
        let toggleButtonSlot = document.createElement('td');
        let editButtonSlot = document.createElement('td');
        let deleteButtonSlot = document.createElement('td');

        // Create buttons for each book
        let toggleButton = document.createElement('button');
        let editButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        // Add css attributes to buttons and bookstatus
        toggleButton.setAttribute('class', 'toggle');
        editButton.setAttribute('class', 'edit');
        deleteButton.setAttribute('class', 'delete');
        bookStatus.setAttribute('class', 'book-status');

        // Add content to each section.
        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        bookPages.textContent = book.pages;
        bookStatus.textContent = book.readOrNot;
        toggleButton.textContent = "Toggle status";
        editButton.textContent = "Edit";
        deleteButton.textContent = "Delete";

        // Add buttons to their holders
        toggleButtonSlot.appendChild(toggleButton);
        editButtonSlot.appendChild(editButton);
        deleteButtonSlot.appendChild(deleteButton);

        // Store book content in an array
        // Add them to book row, and add book row to shelf
        let bookContent = [bookTitle, bookAuthor, bookPages, bookStatus, toggleButtonSlot, editButtonSlot, deleteButtonSlot];
        bookContent.forEach(contentPiece => bookRow.appendChild(contentPiece));
        libraryTable.appendChild(bookRow);

        // Add event listener to buttons.
        toggleButton.addEventListener('click', () => toggleStatus(toggleButton));
        deleteButton.addEventListener('click', () => deleteBook(deleteButton));
        editButton.addEventListener('click', () => editYourBook(editButton));
    }
    return;
}

displayBooks();

let addNewBook = document.querySelector('.add');
let dialogElement = document.querySelector('#dialog');
addNewBook.addEventListener('click', () => {
    dialogElement.showModal();
})
console.log(myLibrary);

// Close form and return to library
let formCloseButton = document.querySelector('.return');
formCloseButton.addEventListener('click', (event) => {
    event.preventDefault();
    dialogElement.close();
})

let submitButton = document.querySelector('.submit');
submitButton.addEventListener('click', (event) => {
    let index = dialogElement.getAttribute('data-book-number'); // Get the index from the dialog element
    addBookToLibrary(index);
    event.preventDefault();
    dialogElement.close();
    libraryTable.textContent = "";
    displayBooks();
});

function toggleStatus(toggleButton) {
    // Find parent row of clicked button
    const bookRow = toggleButton.parentElement.parentElement;
    // Find the cell containing book status.
    const bookStatusCell = bookRow.querySelector('.book-status');
    // Toggle the status.
    bookStatusCell.textContent = bookStatusCell.textContent === "Read" ? "Not read" : "Read";
}

function deleteBook(deleteButton) {
    const bookRow = deleteButton.parentElement.parentElement;
    // delete book in array.
    myLibrary.splice(bookRow.getAttribute('data-book-number'), 1);
    libraryTable.textContent = "";
    displayBooks();
}

function editYourBook(editButton) {
    let bookRow = editButton.parentElement.parentElement;
    let index = bookRow.getAttribute('data-book-number');
    dialogElement.setAttribute('data-book-number', index); // Set the data-book-number attribute
    autofillForm(editButton);
    dialogElement.showModal();

    // Update the event listener for the submit button to handle editing.
    submitButton.removeEventListener('click', addBookToLibrary);
    submitButton.addEventListener('click', (event) => {
        addBookToLibrary(index); // Pass the index to addBookToLibrary()
        event.preventDefault();
        dialogElement.close();
    });
}

function autofillForm (editButton) {
    let bookRow = editButton.parentElement.parentElement;
    let index = bookRow.getAttribute('data-book-number');

    let bookReadStatus = myLibrary[index].readOrNot;

    if (bookReadStatus === "Read") {
        document.querySelector('#yes').checked = true;
    } else {
        document.querySelector('#no').checked = true;
    }

    let title = document.querySelector('#title');
    let author = document.querySelector('#author');
    let pages = document.querySelector('#pages');
    let readStatus = document.querySelector('input[name="read_status"]:checked');

    title.value = myLibrary[index].title;
    author.value = myLibrary[index].author;
    pages.value = myLibrary[index].pages;
    readStatus.value = bookReadStatus;
}