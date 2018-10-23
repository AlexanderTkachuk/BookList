//Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
//UI constructor

function UI() {

}

//add book to list
UI.prototype.addBookToList = function(book) {
    const list = document.querySelector('#book-list');
    //create element 
    const tr = document.createElement('tr');
    tr.className = 'somthing';
    tr.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class = "deleter">X</a></td>
    `;

    list.appendChild(tr);
}

//clear field
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
};

//event listeners 

document.getElementById('book-form').addEventListener('submit', (e)=>{
    e.preventDefault();

    const title = document.querySelector('#title').value,
          author = document.querySelector('#author').value,
          isbn = document.querySelector('#isbn').value;

    //instantiate book
    const book = new Book(title, author, isbn);
    console.log(book);

    //instantiate ui

    const ui = new UI();

    //add book to list
    ui.addBookToList(book);
    
    //clear fields
    ui.clearFields();
});