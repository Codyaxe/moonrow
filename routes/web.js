const express = require("express");
const router = express.Router();
const HomeController = require("../app/controllers/HomeController");
const AuthController = require("../app/controllers/AuthController");
const AuthorController = require("../app/controllers/AuthorController");
const BookController = require("../app/controllers/BookController");
const BorrowerController = require("../app/controllers/BorrowerController");
const LoanController = require("../app/controllers/LoanController");

router.get("/", HomeController.homePage);
router.get("/login", AuthController.loginPage);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/sign-up", AuthController.signUpPage);
router.post("/sign-up", AuthController.signUp);
router.get("/forgot-password", AuthController.forgotPasswordPage);
router.post("/forgot-password", AuthController.forgotPassword);

// CRUD Routes for Authors
router.get("/authors", AuthorController.listAuthors);
router.get("/authors/create", AuthorController.createAuthorPage);
router.post("/authors/create", AuthorController.createAuthor);
router.get("/authors/edit/:id", AuthorController.editAuthorPage);
router.post("/authors/edit/:id", AuthorController.updateAuthor);
router.post("/authors/delete/:id", AuthorController.deleteAuthor);

// CRUD Routes for Books
router.get("/books", BookController.listBooks);
router.get("/books/create", BookController.createBookPage);
router.post("/books/create", BookController.createBook);
router.get("/books/edit/:id", BookController.editBookPage);
router.post("/books/edit/:id", BookController.updateBook);
router.post("/books/delete/:id", BookController.deleteBook);

// CRUD Routes for Borrowers
router.get("/borrowers", BorrowerController.listBorrowers);
router.get("/borrowers/create", BorrowerController.createBorrowerPage);
router.post("/borrowers/create", BorrowerController.createBorrower);
router.get("/borrowers/edit/:id", BorrowerController.editBorrowerPage);
router.post("/borrowers/edit/:id", BorrowerController.updateBorrower);
router.post("/borrowers/delete/:id", BorrowerController.deleteBorrower);

// CRUD Routes for Loans
router.get("/loans", LoanController.listLoans);
router.get("/loans/create", LoanController.createLoanPage);
router.post("/loans/create", LoanController.createLoan);
router.get("/loans/edit/:id", LoanController.editLoanPage);
router.post("/loans/edit/:id", LoanController.updateLoan);
router.post("/loans/delete/:id", LoanController.deleteLoan);

router.use((_, res) => {
  res.status(404).render("404", { hideIntro: true });
});

module.exports = router;
