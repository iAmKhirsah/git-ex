'use strict';

function init() {
  console.log('hello');
  renderBooksTable();
}

function renderTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement('th');
    let text = document.createTextNode(key);
    th.onclick = function () {
      sortBy(key.toLowerCase());
      renderBooksTable();
    };
    th.appendChild(text);
    row.appendChild(th);
  }
}

function renderTable(table, data) {
  for (let content of data) {
    let row = table.insertRow();
    for (let key in content) {
      if (key === 'imgUrl' || key === 'rating') continue;
      let cell = row.insertCell();

      var text = document.createTextNode(content[key]);
      console.log(text);
      cell.appendChild(text);
      if (key === 'price') {
        var text = content[key];
        cell.innerText = text + '$';
      }
    }

    let cell = row.insertCell();
    cell.innerHTML = renderTableButtons(content.id);
  }
}

function renderBooksTable() {
  let books = getBookList();
  let table = document.querySelector('table');
  table.innerHTML = '';
  let data = ['ID', 'Name', 'Price', 'Actions'];
  renderTable(table, books);
  renderTableHead(table, data);
}

function renderTableButtons(id) {
  var strHTML = `<button class="read" onclick="onReadBook('${id}')">Read</button><button class="update" onclick=" renderUpdateForm('${id}')">Update</button><button class="delete" onclick="onRemoveBook('${id}')">Delete</button>`;
  return strHTML;
}

function toggleForm(value) {
  var elForm = document.querySelector(`.${value}-book-menu`);
  if (elForm.style.display === 'none') {
    elForm.style.display = 'flex';
  } else {
    elForm.style.display = 'none';
  }
}
//onSaveBook
function newBookValues(bookId) {
  if (!bookId) {
    toggleForm('add');
    var elNewBookName = document.querySelector('.add-book-name');
    var elNewBookPrice = document.querySelector('.add-book-price');
    var elNewBookImg = document.querySelector('.add-book-image-url');
  } else {
    toggleForm('update');
    var elNewBookName = document.querySelector('.update-book-name');
    var elNewBookPrice = document.querySelector('.update-book-price');
    var elNewBookImg = document.querySelector('.update-book-image-url');
  }
  const newBookName = elNewBookName.value;
  const newBookPrice = +elNewBookPrice.value;
  const newBookImg = elNewBookImg.value;
  /// ADD A NICE MESSAGE TO INPUT VALID NUMBERS ONLY
  if (Number.isNaN(newBookPrice)) {
    resetInputs(elNewBookName, elNewBookPrice, elNewBookImg);
    return;
  }
  if (_isTextEmpty(newBookName, newBookPrice)) {
    resetInputs(elNewBookName, elNewBookPrice, elNewBookImg);
    return;
  }
  if (!bookId) {
    addBook(newBookName, newBookPrice, newBookImg);
  } else {
    updateBook(bookId, newBookName, newBookPrice, newBookImg);
  }
  renderBooksTable();
  resetInputs(elNewBookName, elNewBookPrice, elNewBookImg);
}

function onNextPage() {
  nextPage();
  renderBooksTable();
}
function onPrevPage() {
  prevPage();
  renderBooksTable();
}

function renderUpdateForm(bookId) {
  var elUpdateScreen = document.querySelector('.update-book-menu');
  var bookIdx = findBookIdx(bookId);
  var books = getBookList();
  var book = books[bookIdx];

  var strHTML = `<div class="update-modal">  <form>
    <input class="update-book-name" type="text" value="${book.name}" />
    <input class="update-book-price" type="text" value="${book.price}" />
    <input
      class="update-book-image-url"
      type="text"
      placeholder="Img Url"
    />
    <br>
    <button class="update-book" onclick="newBookValues('${bookId}')">Update</button>
    </form> 
    </div>`;
  elUpdateScreen.innerHTML = strHTML;
}

function onReadBook(bookId) {
  var elModal = document.querySelector('.read-book');
  //getBookById
  var books = getBookList();
  var bookIdx = findBookIdx(bookId);
  elModal.style.display = 'block';
  renderBookDetails(
    books[bookIdx].name,
    books[bookIdx].price,
    books[bookIdx].imgUrl
  );
  //elBookReadRating.id = bookId
  gCurrBookId = bookId;
  renderRating(books[bookIdx]);
}

function renderRating(book) {
  if (!book.rating) book.rating = 0;
  for (var i = 1; i <= book.rating; i++) {
    var elStars = document.querySelector(`.star${i}`);
    elStars.classList.add('checked');
  }
  if (book.rating < 10) {
    for (var i = 10; i > book.rating; i--) {
      var elStars = document.querySelector(`.star${i}`);
      elStars.classList.remove('checked');
    }
  }
}

function starRating(value) {
  //starRating HTML read-book-rating.id
  var currBookId = findBookIdx(gCurrBookId);
  var books = getBookList();
  books[currBookId].rating = value;
  for (var i = 1; i <= value; i++) {
    var elStars = document.querySelector(`.star${i}`);
    elStars.classList.add('checked');
  }
  if (value < 10) {
    for (var i = 10; i > value; i--) {
      var elStars = document.querySelector(`.star${i}`);
      elStars.classList.remove('checked');
    }
  }
  //TODO
  saveToStorage('booksDB', books);
}

function renderBookDetails(name, price, img) {
  var elBookContent = document.querySelector('.book-content');
  if (!img)
    img =
      'https://images-na.ssl-images-amazon.com/images/I/514M7EOaRnL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg';
  var strHTML = `<div class="read-book-cover"><img class="book-img" src="${img} "</div>
    <div class="read-book-name"><span class="key-span">Title:</span> ${name}</div>
    <div class="read-book-price"><span class="key-span">Price:</span> ${price}</div>
    <div class="read-book-description"><span class="key-span">Description:</span> Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br> Magnam sit illo expedita minus eveniet cupiditate <br> corrupti inventore sunt cum, necessitatibus <br> veniam voluptates illum pariatur assumenda quisquam,<br> blanditiis eum alias eligendi!
    </div>
    `;
  elBookContent.innerHTML = strHTML;
}

function onRemoveBook(bookId) {
  removeBook(bookId);
  renderBooksTable();
}

function closeReadScreen() {
  var elModal = document.querySelector('.read-book');
  elModal.style.display = 'none';
}
