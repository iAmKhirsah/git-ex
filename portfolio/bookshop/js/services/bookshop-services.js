'use strict';
var gBooks;
var gCurrBookId;
var gSortBy;
var gPageIdx = 0;
const PAGE_SIZE = 3;
ifNoBooks();
function ifNoBooks() {
  if (loadFromStorage('booksDB').length === 0) {
    _createBooks();
  }
}

function _createBooks() {
  var books = [
    _createBook(
      'Hairy Potter',
      '19.99',
      `https://m.media-amazon.com/images/I/413lxIe20jL._SY346_.jpg`
    ),
    _createBook(
      'Dune',
      '19.99',
      `https://m.media-amazon.com/images/I/41eyq-C0LNL.jpg`
    ),
    _createBook(
      'Black Autumn',
      '19.99',
      `https://m.media-amazon.com/images/I/51GMu02vbUS._SY346_.jpg`
    ),
  ];
  saveToStorage('booksDB', books);
}

function _createBook(name, price, imgUrl) {
  return {
    id: _makeId(),
    name,
    price,
    imgUrl,
  };
}

function getBookList() {
  gBooks = loadFromStorage('booksDB');
  var books = gBooks;
  var fromIdx = gPageIdx * PAGE_SIZE;
  if (gSortBy) {
    books.sort((a, b) => {
      var bookA = a[gSortBy];
      var bookB = b[gSortBy];
      if (bookA < bookB) {
        return -1;
      }
      if (bookA > bookB) {
        return 1;
      }
      return 0;
    });
    // gSortBy = '';
  }
  books = books.slice(fromIdx, fromIdx + PAGE_SIZE);
  return books;
}

function addBook(name, price, img) {
  const book = _createBook(name, price, img);
  gBooks.push(book);
  saveToStorage('booksDB', gBooks);
}

function removeBook(bookId) {
  var bookIdx = findBookIdx(bookId);
  gBooks.splice(bookIdx, 1);
  saveToStorage('booksDB', gBooks);
}

//   saveToStorage('booksDB', books);

function updateBook(bookId, name, price, img = '') {
  var books = getBookList();
  var bookIdx = findBookIdx(bookId);
  books[bookIdx].name = name;
  books[bookIdx].price = price;
  if (img) books[bookIdx].imgUrl = img;

  saveToStorage('booksDB', books);
}

function findBookIdx(bookId) {
  var books = getBookList();
  var bookToUpdateIdx = books.findIndex((book) => {
    return bookId === book.id;
  });
  return bookToUpdateIdx;
}

function nextPage() {
  gPageIdx++;
  if (gPageIdx * PAGE_SIZE >= gBooks.length) gPageIdx = 0;
}

function prevPage() {
  gPageIdx--;
  if (gPageIdx < 0) gPageIdx = 0;
}

function _isTextEmpty(name, price) {
  for (var i = 0; i < name.length; i++) {
    if (name === '') return true;
    if (name.charAt(i) === ' ') continue;
    if (name.charAt(i) !== ' ') return false;
  }
  for (var i = 0; i < price.length; i++) {
    if (price === '') return true;
    if (price.charAt(i) === ' ') continue;
    if (price.charAt(i) !== ' ') return false;
  }
  //trim
  return true;
}

function resetInputs(elNewBookName, elNewBookPrice, elNewBookImg) {
  elNewBookName.value = '';
  elNewBookPrice.value = '';
  elNewBookImg.value = '';
}

function _makeId(length = 5) {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var txt = '';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function sortBy(sortKey) {
  gSortBy = sortKey;
}
