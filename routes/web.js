const express = require("express");
const router = express.Router();
const HomeController = require("../app/controllers/HomeController");
const AuthController = require("../app/controllers/AuthController");
const DashboardController = require("../app/controllers/DashboardController");
const AuthorController = require("../app/controllers/AuthorController");
const BookController = require("../app/controllers/BookController");
const BorrowerController = require("../app/controllers/BorrowerController");
const LoanController = require("../app/controllers/LoanController");
const isAuth = require("../app/middlewares/isAuth");

router.get("/", HomeController.homePage);
router.get("/about", HomeController.aboutPage);
router.get("/dashboard", isAuth, DashboardController.dashboardPage);
router.get("/login", AuthController.loginPage);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/sign-up", AuthController.signUpPage);
router.post("/sign-up", AuthController.signUp);
router.get("/forgot-password", AuthController.forgotPasswordPage);
router.post("/forgot-password", AuthController.forgotPassword);

// CRUD Routes for Authors
router.get("/authors", isAuth, AuthorController.listAuthors);
router.get("/authors/create", isAuth, AuthorController.createAuthorPage);
router.post("/authors/create", isAuth, AuthorController.createAuthor);
router.get("/authors/edit/:id", isAuth, AuthorController.editAuthorPage);
router.post("/authors/edit/:id", isAuth, AuthorController.updateAuthor);
router.post("/authors/delete/:id", isAuth, AuthorController.deleteAuthor);

// CRUD Routes for Books
router.get("/books", isAuth, BookController.listBooks);
router.get("/books/create", isAuth, BookController.createBookPage);
router.post("/books/create", isAuth, BookController.createBook);
router.get("/books/edit/:id", isAuth, BookController.editBookPage);
router.post("/books/edit/:id", isAuth, BookController.updateBook);
router.post("/books/delete/:id", isAuth, BookController.deleteBook);

// CRUD Routes for Borrowers
router.get("/borrowers", isAuth, BorrowerController.listBorrowers);
router.get("/borrowers/create", isAuth, BorrowerController.createBorrowerPage);
router.post("/borrowers/create", isAuth, BorrowerController.createBorrower);
router.get("/borrowers/edit/:id", isAuth, BorrowerController.editBorrowerPage);
router.post("/borrowers/edit/:id", isAuth, BorrowerController.updateBorrower);
router.post("/borrowers/delete/:id", isAuth, BorrowerController.deleteBorrower);

// CRUD Routes for Loans
router.get("/loans", isAuth, LoanController.listLoans);
router.get("/loans/create", isAuth, LoanController.createLoanPage);
router.post("/loans/create", isAuth, LoanController.createLoan);
router.get("/loans/edit/:id", isAuth, LoanController.editLoanPage);
router.post("/loans/edit/:id", isAuth, LoanController.updateLoan);
router.post("/loans/delete/:id", isAuth, LoanController.deleteLoan);

router.use((_, res) => {
  res.status(404).render("404", { hideIntro: true });
});

module.exports = router;
