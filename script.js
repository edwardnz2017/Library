let myLibrary = [] //This will store the book information that is added by the user.

function Book(name, author, pages, status) {
    this.name = name
    this.author = author
    this.pages = pages
    this.status = status
}

//Event listener for submit button, which will transfer inputted information to addBookToLibrary
const submitBtn = document.querySelector(".submit-btn") 
submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    addBookToLibrary()
    document.getElementById("book-name").value = ""
    document.getElementById("author-name").value = ""
    document.getElementById("pages").value = ""
    document.getElementById("read").checked = false
    document.getElementById("not-read-yet").checked = false
})

//This will add a new Book object to the myLibrary[] array.
function addBookToLibrary() {
    let bookName = document.getElementById("book-name").value
    let authorName = document.getElementById("author-name").value
    let pages = document.getElementById("pages").value
    let readOrNot;
    if (document.getElementById("read").checked) {
        readOrNot = "Read"
    } else {
        readOrNot = "Not read yet"
    }
    if (bookName === "" || authorName === "" || pages === 0) {
        return alert("Enter details of the book!")
    }
    const book = new Book(bookName, authorName, pages, readOrNot)
    myLibrary.push(book)
    render(book)
} 

const catalogue = document.querySelector(".catalogue")

//This will create a DIV in the HTMl with information on the book.
function render(book) {
    catalogue.innerText = " "
    for (let i = 0; i < myLibrary.length; i++) {
        let bookDiv = document.createElement("div")
        let bookTitle = document.createElement("div")
        let bookAuthor = document.createElement("div")
        let bookPages = document.createElement("div")
        let bookStatus = document.createElement("div")
        let bookFoot = document.createElement("div")
        let deleteButton = document.createElement("button")
        let toggleButton = document.createElement("button")
        deleteButton.classList.add("delete-btn", "divButton")
        deleteButton.innerText = "Delete"
        deleteButton.setAttribute('id', `${i}`)
        toggleButton.classList.add("toggle-btn", "divButton")
        toggleButton.innerText = "Toggle Read"
        toggleButton.setAttribute('id', `${i}`)
        bookDiv.classList.add("bookDiv")
        bookTitle.innerText = myLibrary[i].name + " " 
        bookAuthor.innerText += myLibrary[i].author + " "
        bookPages.innerText += myLibrary[i].pages + " pages"
        bookStatus.innerText += myLibrary[i].status + " "
        bookTitle.classList.add("bookTitle")
        bookAuthor.classList.add("bookAuthor")
        bookStatus.classList.add("bookStatus")
        bookFoot.classList.add("bookFoot")
        catalogue.appendChild(bookDiv)
        bookDiv.appendChild(bookTitle)
        bookDiv.appendChild(bookAuthor)
        bookDiv.appendChild(bookPages)
        bookDiv.appendChild(bookStatus)
        bookDiv.appendChild(bookFoot)
        bookFoot.appendChild(deleteButton)
        bookFoot.appendChild(toggleButton)
        deleteBook()
        togRead()
    }
}   
//This adds an event to the delete button, which will delete it from the myLibrary array
function deleteBook() {
    let deleteButton = document.querySelectorAll(".delete-btn")
    deleteButton.forEach((button) => {
        if (button.classList.contains("eventOn")) {
            return
        }
        button.classList.add("eventOn")
        button.addEventListener('click', (e) => {
            myLibrary.splice(e.srcElement.id, 1)
            render()
        })
    })  
}
//This adds an event to the Toggle Read button, which will change the read status
function togRead() {
    let toggle = document.querySelectorAll(".toggle-btn")
    toggle.forEach((button) => {
        if (button.classList.contains("eventOn")) {
            return
        }
        button.classList.add("eventOn")
        button.addEventListener('click', (e) => {
            Book.prototype.changeReadStatus = function() {
                this.status = (this.status === "Read") ? "Not read yet" : "Read" 
            }
            myLibrary[e.srcElement.id].changeReadStatus()
            render()
        })
    })
}