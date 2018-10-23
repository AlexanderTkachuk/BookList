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
    tr.innerHTML = `<tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete" >X</a></td>
    </tr>
    `;

    list.appendChild(tr);
};

UI.prototype.showAlert = function(message, className) {
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
};

//delete book
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

//clear field
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
};

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
})