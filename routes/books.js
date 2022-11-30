const express = require('express');
const router = express.Router();
const { Book, validateBook } = require('../models/books');


//POST : Create a New Book
router.post("/", async (req, res) => {
    const error = await validateBook(req.body);
    if (error.message) res.status(400).send(error.message);

    book = new Book({
        name: req.body.bookName,
        author: {
            name: req.body.authorName,
            age: req.body.authorAge
        },
        genre: req.body.genre
    });

    book.save().then(book => {
        res.send(book);
    }).catch(error => {
        res.status(500).send("Book was not Stored in DB");
    });

});

//Get all books
router.get("/", (req, res) => {
    Book.find().then((books) => res.send(books))
        .catch((error) => {
            res.status(500).send("Something went Wrong");
        });
});

//Get the book by _id
router.get("/:bookId", async(req, res) => {
   const book = await Book.findById(req.params.bookId);
   if(!book) res.status(404).send("Book not Found");
   res.send(book); 
});

//Update book based on book id 
router.put("/:bookId", async(req, res) => {
    const updateBook = await Book.findByIdAndUpdate(req.params.bookId,{
        name:req.body.bookName,
        author:{
            name:req.body.authorName,
            age:req.body.authorAge
        },
        genre:req.body.genre
    },
    {new:true});

    if(!updateBook) res.status(404).send("Book Not Found");
    res.send(updateBook);
 });


 //Delete book based on ID
 router.delete("/:bookId", async(req, res) => {
    const book = await Book.findByIdAndRemove(req.params.bookId);

    if(!book) res.status(404).send("Book with Id not Found");
    res.send(book);
 });


module.exports = router;