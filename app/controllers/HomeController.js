const Book = require("../models/Book");
const Author = require("../models/Author");

exports.homePage = async (req, res) => {
  try {
    if (req.session.isLoggedIn) {
      // Logged in: Show quick access dashboard
      const totalBooks = await Book.count();
      const totalAuthors = await Author.count();

      res.render("home", {
        pageTitle: "Home",
        isLoggedIn: true,
        hideIntro: true,
        stats: {
          totalBooks,
          totalAuthors,
        },
      });
    } else {
      // Logged out: Show public welcome page
      const featuredBooks = await Book.findAll({
        include: [{ model: Author, as: "author" }],
        limit: 4,
        order: [["PublishedYear", "DESC"]],
      });

      res.render("home", {
        pageTitle: "Welcome to Moonrow Library",
        isLoggedIn: false,
        hideIntro: true,
        featuredBooks,
      });
    }
  } catch (err) {
    console.log(err);
    res.render("home", {
      pageTitle: "Home",
      isLoggedIn: req.session.isLoggedIn || false,
      hideIntro: true,
    });
  }
};

exports.aboutPage = (req, res) => {
  res.render("about", {
    pageTitle: "About Us",
    hideIntro: true,
  });
};
