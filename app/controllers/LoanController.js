const Loan = require("../models/Loan");
const Book = require("../models/Book");
const Borrower = require("../models/Borrower");
const Author = require("../models/Author");

// List all loans
exports.listLoans = async (req, res) => {
  try {
    const loans = await Loan.findAll({
      include: [
        {
          model: Book,
          as: "book",
          include: [{ model: Author, as: "author" }],
        },
        { model: Borrower, as: "borrower" },
      ],
      order: [["BorrowDate", "DESC"]],
    });
    res.render("loans/list", {
      pageTitle: "Loans",
      loans: loans,
      layout: "web_layout",
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Error loading loans");
    res.redirect("/");
  }
};

// Show create form
exports.createLoanPage = async (req, res) => {
  try {
    const books = await Book.findAll({
      where: { CopiesAvailable: { [require("sequelize").Op.gt]: 0 } },
      order: [["Title", "ASC"]],
    });
    const borrowers = await Borrower.findAll({
      order: [["LastName", "ASC"]],
    });
    res.render("loans/create", {
      pageTitle: "New Loan",
      books: books,
      borrowers: borrowers,
      layout: "web_layout",
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Error loading form");
    res.redirect("/loans");
  }
};

// Create new loan
exports.createLoan = async (req, res) => {
  try {
    const { BookID, BorrowerID, BorrowDate } = req.body;

    // Decrease book copies
    const book = await Book.findByPk(BookID);
    if (book && book.CopiesAvailable > 0) {
      await book.update({ CopiesAvailable: book.CopiesAvailable - 1 });
    }

    await Loan.create({
      BookID,
      BorrowerID,
      BorrowDate: BorrowDate || new Date(),
      Status: "Borrowed",
    });

    req.flash("success", "Loan created successfully!");
    req.session.save(() => {
      res.redirect("/loans");
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Error creating loan");
    req.session.save(() => {
      res.redirect("/loans/create");
    });
  }
};

// Show edit form
exports.editLoanPage = async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id);
    const books = await Book.findAll({ order: [["Title", "ASC"]] });
    const borrowers = await Borrower.findAll({ order: [["LastName", "ASC"]] });

    if (!loan) {
      req.flash("error", "Loan not found");
      return res.redirect("/loans");
    }

    res.render("loans/edit", {
      pageTitle: "Edit Loan",
      loan: loan,
      books: books,
      borrowers: borrowers,
      layout: "web_layout",
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Error loading loan");
    res.redirect("/loans");
  }
};

// Update loan
exports.updateLoan = async (req, res) => {
  try {
    const { BookID, BorrowerID, BorrowDate, ReturnDate, Status } = req.body;
    const loan = await Loan.findByPk(req.params.id);

    if (!loan) {
      req.flash("error", "Loan not found");
      return req.session.save(() => {
        res.redirect("/loans");
      });
    }

    // If status changed to 'Returned', increase book copies
    if (loan.Status === "Borrowed" && Status === "Returned") {
      const book = await Book.findByPk(loan.BookID);
      if (book) {
        await book.update({ CopiesAvailable: book.CopiesAvailable + 1 });
      }
    }

    await loan.update({
      BookID,
      BorrowerID,
      BorrowDate,
      ReturnDate: ReturnDate || null,
      Status,
    });

    req.flash("success", "Loan updated successfully!");
    req.session.save(() => {
      res.redirect("/loans");
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Error updating loan");
    req.session.save(() => {
      res.redirect("/loans");
    });
  }
};

// Delete loan
exports.deleteLoan = async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id);

    if (!loan) {
      req.flash("error", "Loan not found");
      return req.session.save(() => {
        res.redirect("/loans");
      });
    }

    // If loan was borrowed, increase book copies
    if (loan.Status === "Borrowed") {
      const book = await Book.findByPk(loan.BookID);
      if (book) {
        await book.update({ CopiesAvailable: book.CopiesAvailable + 1 });
      }
    }

    await loan.destroy();
    req.flash("success", "Loan deleted successfully!");
    req.session.save(() => {
      res.redirect("/loans");
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Error deleting loan");
    req.session.save(() => {
      res.redirect("/loans");
    });
  }
};
