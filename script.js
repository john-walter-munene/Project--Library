const myLibrary = [];

class Book {
    constructor(title, author, pages, readOrNot) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readOrNot = readOrNot;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages}, ${this.readOrNot}`;
    }
}

let libraryTable = document.querySelector('.books');

function displayBooks() {
    // Clear UI before populating with current library status.
    libraryTable.textContent = "";
    for (let counter = 0; counter < myLibrary.length; counter++) {
        // Access current book
        let book = myLibrary[counter];

        // Create a new table row for each book
        // Add a data attribute to each item, needed for edits
        let bookRow = document.createElement('tr');
        bookRow.setAttribute('data-book-number', counter);

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

        // Add CSS attributes to buttons and book status
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

        // Store book content in array
        // Add book in row, add row in table
        let bookContent = [bookTitle, bookAuthor, bookPages, bookStatus, toggleButtonSlot, editButtonSlot, deleteButtonSlot];
        bookContent.forEach(contentPiece => bookRow.appendChild(contentPiece));
        libraryTable.appendChild(bookRow);

        // Adds event listeners to buttons
        toggleButton.addEventListener('click', () => toggleStatus(toggleButton));
        deleteButton.addEventListener('click', () => deleteBook(deleteButton));
        editButton.addEventListener('click', () => editYourBook(editButton));
    }

    return;
}

// Create dummy books, and add them to library hence visualize UI.
let bookOne = new Book('Rich dad poor dad', 'Robert Kiyosaki', 1000, 'Read');
let bookTwo = new Book('The Startup Way', 'Eric Ries', 390, 'Not Read');
myLibrary.push(bookOne, bookTwo);
displayBooks();

function addBookToLibrary() {
    // Get form inputs
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let readStatus = document.querySelector('input[name="read_status"]:checked').getAttribute('value');

    // Check if any of the required fields are empty
    if (!title || !author || !pages) addBookToLibrary();

    // Decide whether to edit or add new book in library
    let index = dialogElement.getAttribute('data-book-number');
    if (index !== null) {
        updateBook(index, title, author, pages, readStatus);
    } else {
        let newBookObject = new Book(title, author, pages, readStatus);
        myLibrary.push(newBookObject);
    }

    clearForm();
    displayBooks();
    return;
}

function updateBook(index, title, author, pages, readStatus) {
    // Get book to update
    let bookToUpdate = myLibrary[index];

    // Update book
    bookToUpdate.title = title;
    bookToUpdate.author = author;
    bookToUpdate.pages = pages;
    bookToUpdate.readOrNot = readStatus;

    return;
}

function clearForm() {
    // Reset all form input fields
    document.querySelector('#title').value = "";
    document.querySelector('#author').value = "";
    document.querySelector('#pages').value = "";
    document.querySelector('input[name="read_status"]:checked').checked = false;
    return;
}

let dialogElement = document.querySelector('#dialog');

let addNewBookButton = document.querySelector('.add');
addNewBookButton.addEventListener('click', () => {
    dialogElement.showModal();
});

let formCloseButton = document.querySelector('.return');
formCloseButton.addEventListener('click', (event) => {
    clearForm();
    event.preventDefault();
    dialogElement.close();
});

let submitButton = document.querySelector('.submit');
submitButton.addEventListener('click', (event) => {
    addBookToLibrary();
    event.preventDefault();
    dialogElement.close();
});

function toggleStatus(toggleButton) {
    // Access book position, and current status
    // Toggle status
    const bookRow = toggleButton.parentElement.parentElement;
    const bookStatusCell = bookRow.querySelector('.book-status');
    bookStatusCell.textContent = bookStatusCell.textContent === "Read" ? "Not read" : "Read";
    return;
}

function deleteBook(deleteButton) {
    // Delete selected book.
    const bookRow = deleteButton.parentElement.parentElement;
    myLibrary.splice(bookRow.getAttribute('data-book-number'), 1);
    displayBooks();
    return;
}

function editYourBook(editButton) {
    let bookRow = editButton.parentElement.parentElement;
    let index = bookRow.getAttribute('data-book-number');
    
    dialogElement.setAttribute('data-book-number', index);
    autofillForm(editButton);
    dialogElement.showModal();

    submitButton.removeEventListener('click', addBookToLibrary);
    submitButton.addEventListener('click', () => {
        addBookToLibrary();
        dialogElement.close();
    });
    return;
}

function autofillForm(editButton) {
    // Get book row, index and status
    let bookRow = editButton.parentElement.parentElement;
    let index = bookRow.getAttribute('data-book-number');
    let bookReadStatus = myLibrary[index].readOrNot;

    // Get form fields
    let title = document.querySelector('#title');
    let author = document.querySelector('#author');
    let pages = document.querySelector('#pages');

    // Autofill form fields
    title.value = myLibrary[index].title;
    author.value = myLibrary[index].author;
    pages.value = myLibrary[index].pages;
    document.querySelector('#yes').checked = bookReadStatus === "Read" ? true : false;
    document.querySelector('#no').checked = bookReadStatus === "Not Read" ? true : false;
    return;
}