
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let books = [
    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho",
        year: 1988
    },
    {
        id: 2,
        title: "Wings of Fire",
        author: "A.P.J. Abdul Kalam",
        year: 1999
    }
];

// GET - View all books
app.get("/books", (req, res) => {
    res.json(books);
});

// POST - Add a new book
app.post("/books", (req, res) => {
    const newBook = {
        id: Date.now(),
        title: req.body.title,
        author: req.body.author,
        year: req.body.year
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT - Update a book
app.put("/books/:id", (req, res) => {
    const id = Number(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    book.title = req.body.title;
    book.author = req.body.author;
    book.year = req.body.year;

    res.json(book);
});

// DELETE - Delete a book
app.delete("/books/:id", (req, res) => {
    const id = Number(req.params.id);

    const bookExists = books.some(b => b.id === id);

    if (!bookExists) {
        return res.status(404).json({ message: "Book not found" });
    }

    books = books.filter(b => b.id !== id);

    res.json({ message: "Book deleted successfully" });
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
