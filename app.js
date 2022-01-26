// book class: Represents a book
class Book {
    constructor(title, author, price){
        this.title = title;
        this.author = author;
        this.price = price;

    }
}

// UI Class: Handle UI tasks

class UI {
    static displayBooks() {
        // const storedBooks = [
        //     {
        //         title: "Harry Potter",
        //         author: "J.K Rowling",
        //         price: '2000'
        //     }, 
        //      {
        //         title: "The Alchemist",
        //         author: "J.K Rowling",
        //         price: '2000'
        //     }, 
        //      {
        //         title: "Book three",
        //         author: "J.K Rowling",
        //         price: '2000'
        //     }
        // ];
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.price}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div')
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        form.parentNode.insertBefore(div, form);

        // vanish in 3 seconds
        setTimeout(()=> document.querySelector('.alert').remove(), 3000);
    }
    static clearFields(){
        document.querySelector('#title').value = '';
         document.querySelector('#author').value = '';
          document.querySelector('#price').value = '';
    }
}

// store class: handles storage

class Store {
    static getBooks() {
          let books;
          if(localStorage.getItem('books')=== null) {
              books = [];
          } else {
              books = JSON.parse(localStorage.getItem('books'));
          }

          return books;
    }

    static addBooks(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(price) {
        const books = Store.getBooks();

        books.forEach((books, index) => {
            if(books.isbn == isbn) {
                books.splice(index, 1);
            }
        }
        );
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event: Display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a book
document.querySelector('#book-form').addEventListener('submit',
(e) => {
    //prevent actual submit
    e.preventDefault();
    // Get form value
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const price = document.querySelector('#price').value;
    
    //Validate
    if(title === '' || author === '' || price === ''){
        UI.showAlert("Please fill up all the fields", 'danger');
    } else {
        //Instantiate book
        const book =  new Book(title, author, price);

        // Add book to UI
        UI.addBookToList(book);
        Store.addBooks(book);
        // show success message
        UI.showAlert("book added!", 'success')
        //clear fields
        UI.clearFields()
    }

    
});

// Event: Remove a book
document.querySelector('#book-list').addEventListener('click',(e) => {
    UI.deleteBook(e.target)

    UI.showAlert("book removed!", 'success')
})