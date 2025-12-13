const Book = require("../models/Book");
const Author = require("../models/Author");
const Genre = require("../models/Genre");

// List all books
exports.listBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      include: [
        { model: Author, as: "author" },
        { model: Genre, as: "genre" },
      ],
      order: [["Title", "ASC"]],
    });
    res.render("books/list", {
      pageTitle: "Books",
      books: books,
      layout: "web_layout",
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Error loading books");
    res.redirect("/");
  }
};

// Show create form
exports.createBookPage = async (req, res) => {
  try {
    const authors = await Author.findAll({ order: [["LastName", "ASC"]] });
    const genres = await Genre.findAll({ order: [["GenreName", "ASC"]] });
    res.render("books/create", {
      pageTitle: "Add New Book",
      authors: authors,
      genres: genres,
      layout: "web_layout",
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Error loading form");
    res.redirect("/books");
  }
};

// Create new book
exports.createBook = async (req, res) => {
  try {
    const { Title, AuthorID, GenreID, PublishedYear, CopiesAvailable } =
      req.body;
    await Book.create({
      Title,
      AuthorID: AuthorID || null,
      GenreID: GenreID || null,
      PublishedYear,
      CopiesAvailable: CopiesAvailable || 1,
    });
    req.flash("success", "Book created successfully!");
    req.session.save(() => {
      res.redirect("/books");
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Error creating book");
    req.session.save(() => {
      res.redirect("/books/create");
    });
  }
};

// Show edit form
exports.editBookPage = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    const authors = await Author.findAll({ order: [["LastName", "ASC"]] });
    const genres = await Genre.findAll({ order: [["GenreName", "ASC"]] });
    if (!book) {
      req.flash("error", "Book not found");
      return res.redirect("/books");
    }
    res.render("books/edit", {
      pageTitle: "Edit Book",
      book: book,
      authors: authors,
      genres: genres,
      layout: "web_layout",
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Error loading book");
    res.redirect("/books");
  }
};

// Update book
exports.updateBook = async (req, res) => {
  try {
    const { Title, AuthorID, GenreID, PublishedYear, CopiesAvailable } =
      req.body;
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      req.flash("error", "Book not found");
      return req.session.save(() => {
        res.redirect("/books");
      });
    }
    await book.update({
      Title,
      AuthorID: AuthorID || null,
      GenreID: GenreID || null,
      PublishedYear,
      CopiesAvailable,
    });
    req.flash("success", "Book updated successfully!");
    req.session.save(() => {
      res.redirect("/books");
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Error updating book");
    req.session.save(() => {
      res.redirect("/books");
    });
  }
};

// Delete book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      req.flash("error", "Book not found");
      return req.session.save(() => {
        res.redirect("/books");
      });
    }
    await book.destroy();
    req.flash("success", "Book deleted successfully!");
    req.session.save(() => {
      res.redirect("/books");
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Error deleting book");
    req.session.save(() => {
      res.redirect("/books");
    });
  }
};
