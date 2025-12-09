const { Op } = require("sequelize");
const sequelize = require("../../config/database");
const Book = require("../models/Book");
const Author = require("../models/Author");
const Borrower = require("../models/Borrower");
const Loan = require("../models/Loan");

// Dashboard Page
exports.dashboardPage = async (req, res) => {
  try {
    // KPI Stats
    const totalBooks = await Book.count();
    const totalBorrowers = await Borrower.count();
    const activeLoans = await Loan.count({
      where: { Status: "Borrowed" },
    });

    const availableCopies = await Book.sum("CopiesAvailable");

    // Calculate overdue books (loans borrowed more than 14 days ago without return)
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    const overdueLoans = await Loan.count({
      where: {
        Status: "Borrowed",
        BorrowDate: {
          [Op.lt]: fourteenDaysAgo,
        },
      },
    });

    // Loan trends over last 12 months
    const loanTrends = await sequelize.query(
      `SELECT 
        DATE_FORMAT(BorrowDate, '%Y-%m') as month,
        COUNT(*) as count
      FROM Loans
      WHERE BorrowDate >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
      GROUP BY DATE_FORMAT(BorrowDate, '%Y-%m')
      ORDER BY month ASC`,
      { type: sequelize.QueryTypes.SELECT }
    );

    // Books by genre
    const booksByGenre = await sequelize.query(
      `SELECT Genre, COUNT(*) as count
      FROM Books
      GROUP BY Genre
      ORDER BY count DESC`,
      { type: sequelize.QueryTypes.SELECT }
    );

    // Loan status distribution
    const loanStatus = await sequelize.query(
      `SELECT Status, COUNT(*) as count
      FROM Loans
      GROUP BY Status`,
      { type: sequelize.QueryTypes.SELECT }
    );

    // Most popular books (most borrowed)
    const popularBooks = await sequelize.query(
      `SELECT b.Title, a.FirstName, a.LastName, COUNT(l.LoanID) as loanCount
      FROM Books b
      LEFT JOIN Authors a ON b.AuthorID = a.AuthorID
      LEFT JOIN Loans l ON b.BookID = l.BookID
      GROUP BY b.BookID, b.Title, a.FirstName, a.LastName
      ORDER BY loanCount DESC
      LIMIT 10`,
      { type: sequelize.QueryTypes.SELECT }
    );

    // Recent loans (last 10)
    const recentLoans = await Loan.findAll({
      include: [
        {
          model: Book,
          as: "book",
          include: [{ model: Author, as: "author" }],
        },
        { model: Borrower, as: "borrower" },
      ],
      order: [["BorrowDate", "DESC"]],
      limit: 10,
    });

    // Overdue loans detail
    const overdueLoansDetail = await Loan.findAll({
      where: {
        Status: "Borrowed",
        BorrowDate: {
          [Op.lt]: fourteenDaysAgo,
        },
      },
      include: [
        {
          model: Book,
          as: "book",
          include: [{ model: Author, as: "author" }],
        },
        { model: Borrower, as: "borrower" },
      ],
      order: [["BorrowDate", "ASC"]],
    });

    res.render("dashboard", {
      pageTitle: "Dashboard",
      layout: "web_layout",
      hideIntro: true,
      stats: {
        totalBooks,
        totalBorrowers,
        activeLoans,
        availableCopies: availableCopies || 0,
        overdueLoans,
      },
      chartData: {
        loanTrends: JSON.stringify(loanTrends),
        booksByGenre: JSON.stringify(booksByGenre),
        loanStatus: JSON.stringify(loanStatus),
        popularBooks: JSON.stringify(popularBooks),
      },
      recentLoans,
      overdueLoansDetail,
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Error loading dashboard");
    res.redirect("/");
  }
};
