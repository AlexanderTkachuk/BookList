class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
};

class UI {
    addBookToList(book){
        const list = document.querySelector('#book-list');
        //create element 
        const tr = document.createElement('tr');
        tr.className = 'somthing';
        tr.innerHTML = `<tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete" >X</a></td>
        </tr>
        `;
    
        list.appendChild(tr);
    }

    showAlert(message, className) {
        //create div
        const div = document.createElement('div');
        div.className =`alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        container.insertBefore(div, form);

        setTimeout(function(){
            document.querySelector('.alert').remove();
        },3000)
    }

    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
};

class Store {

    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(book => {
            const ui = new UI;

            //add book
            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook() {

    }
}

//dom load event

document.addEventListener('DOMContentLoaded', Store.displayBooks);

//event listeners for add book
document.getElementById('book-form').addEventListener('submit', (e)=>{
    e.preventDefault();

    const title = document.querySelector('#title').value,
          author = document.querySelector('#author').value,
          isbn = document.querySelector('#isbn').value;

    //instantiate book
    const book = new Book(title, author, isbn);
    
    //instantiate ui
    const ui = new UI();

    //validate
    if(title === '' || author === '' || isbn ==='') {
        //error
        ui.showAlert('Pleas fill in all fields', 'error');
    } else {
        //add book to list
        ui.addBookToList(book);

        //add to ls
        Store.addBook(book);

        //show success
        ui.showAlert('Success append', 'success');
        //clear fields
        ui.clearFields();
    }
});

//event listener for delete
document.getElementById('book-list').addEventListener('click', (e)=>{
    e.preventDefault();

    const ui = new UI();

    ui.deleteBook(e.target);

    //show message
    ui.showAlert('Book Remover!', 'success');
});

//localstorage

