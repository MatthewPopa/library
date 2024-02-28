const myLibrary = [
    {
        title: 'The Chronicles of Narnia',
        author: 'C.S. Lewis',
        pages: 768,
        cover: 'narnia.jpg',
        read: false,
        color: '#f7aa28',
        bg: '#030406'
    },
    {
        title: 'The Screwtape Letters',
        author: 'C.S. Lewis',
        pages: 224,
        cover: 'screwtape.jpg',
        read: true,
        color: '#1f262e',
        bg: '#f1f3f0'
    },
    {
        title: 'The Final Quest',
        author: 'Rick Joyner',
        pages: 170,
        cover: 'finalquest.jpg',
        read: true,
        color: '#ffffff',
        bg: '#413e5b'
    }
];

const submit = document.querySelector('#submit');
const form = document.querySelector('#form');
const carousel = document.querySelector('.carousel');
const title = document.querySelector('.title');
const subtitle = document.querySelector('.subtitle');
let newImg = new Image();

form.addEventListener("submit", addBookToLibrary, true);
carousel.addEventListener("click", (e) => {
    if (e.target.classList.contains('book')) {
        bookIndex = myLibrary[e.target.dataset.index];
        title.textContent = bookIndex.title;
        let read = bookIndex.read ? "Have read" : "Haven't read";
        subtitle.textContent = `By ${bookIndex.author} - ${bookIndex.pages} pages. ${read}.`
        document.querySelector('.active').classList.toggle('active');
        e.target.classList.add('active');
    }
});

document.querySelector("#cover").addEventListener("change", (e) => {
    newImg.src = URL.createObjectURL(e.target.files[0]);
    document.querySelector('.thumbnail').replaceChildren(newImg);
});

function Book(title, author, pages, cover, read, color, bg) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.cover = cover ? newImg.src : "default.jpg";
    this.read = read;
    this.color = color;
    this.bg = bg;
}

function addBookToLibrary() {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let cover = newImg.src;
    let read = document.querySelector('#read').checked ? true : false;
    let color = document.querySelector('#color').value;
    let bg = document.querySelector('#bg').value;
    form.reset();
    const book = new Book(title, author, pages, cover, read, color, bg);
    myLibrary.push(book);
    console.table(myLibrary);
    populateNewBook();
    event.preventDefault();
}

function populateLibrary() {
    let i = 0;
    for (book of myLibrary) {
        const newBook = document.createElement('div');
        const newBookSpine = document.createElement('div');
        const bookFront = document.createElement('div');
        if (i == 0) {
            newBook.classList.add('active');
        }
        newBook.classList.add('book');
        newBookSpine.classList.add('spine');
        bookFront.classList.add('front');
        newBookSpine.textContent = book.title;
        newBookSpine.style.color = book.color;
        newBookSpine.style.backgroundColor = book.bg;
        newBook.dataset.index = i;
        const bookCoverImage = document.createElement('img');
        bookCoverImage.src = book.cover;
        newBook.appendChild(newBookSpine);
        newBook.appendChild(bookFront);
        bookFront.appendChild(bookCoverImage);
        carousel.appendChild(newBook);
        i++;
    }
}

populateLibrary();

function populateNewBook() {
    book = myLibrary[myLibrary.length - 1];
    console.table(book);
    const newBook = document.createElement('div');
    newBook.classList.add('book');

    const bookFront = document.createElement('div');
    bookFront.classList.add('front');

    const newBookSpine = document.createElement('div');
    newBookSpine.classList.add('spine');
    newBookSpine.textContent = book.title;
    newBookSpine.style.color = book.color;
    newBookSpine.style.backgroundColor = book.bg;

    newBook.dataset.index = myLibrary.length - 1;
    const bookCoverImage = document.createElement('img');
    bookCoverImage.src = newImg.src;
    newBook.appendChild(newBookSpine);
    newBook.appendChild(bookFront);
    bookFront.appendChild(bookCoverImage);
    carousel.appendChild(newBook);
}