const Author = require("../models/Author");

// List all authors
exports.listAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll({
      order: [
        ["LastName", "ASC"],
        ["FirstName", "ASC"],
      ],
    });
    res.render("authors/list", {
      pageTitle: "Authors",
      authors: authors,
      layout: "web_layout",
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Error loading authors");
    res.redirect("/");
  }
};

// Show create form
exports.createAuthorPage = (req, res) => {
  res.render("authors/create", {
    pageTitle: "Add New Author",
    layout: "web_layout",
  });
};

// Create new author
exports.createAuthor = async (req, res) => {
  try {
    const { FirstName, LastName } = req.body;
    await Author.create({ FirstName, LastName });
    req.flash("success", "Author created successfully!");
    req.session.save(() => {
      res.redirect("/authors");
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Error creating author");
    req.session.save(() => {
      res.redirect("/authors/create");
    });
  }
};

// Show edit form
exports.editAuthorPage = async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) {
      req.flash("error", "Author not found");
      return res.redirect("/authors");
    }
    res.render("authors/edit", {
      pageTitle: "Edit Author",
      author: author,
      layout: "web_layout",
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Error loading author");
    res.redirect("/authors");
  }
};

// Update author
exports.updateAuthor = async (req, res) => {
  try {
    const { FirstName, LastName } = req.body;
    const author = await Author.findByPk(req.params.id);
    if (!author) {
      req.flash("error", "Author not found");
      return req.session.save(() => {
        res.redirect("/authors");
      });
    }
    await author.update({ FirstName, LastName });
    req.flash("success", "Author updated successfully!");
    req.session.save(() => {
      res.redirect("/authors");
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Error updating author");
    req.session.save(() => {
      res.redirect("/authors");
    });
  }
};

// Delete author
exports.deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) {
      req.flash("error", "Author not found");
      return req.session.save(() => {
        res.redirect("/authors");
      });
    }
    await author.destroy();
    req.flash("success", "Author deleted successfully!");
    req.session.save(() => {
      res.redirect("/authors");
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Error deleting author");
    req.session.save(() => {
      res.redirect("/authors");
    });
  }
};
