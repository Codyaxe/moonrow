const Borrower = require("../models/Borrower");

// List all borrowers
exports.listBorrowers = async (req, res) => {
  try {
    const borrowers = await Borrower.findAll({
      order: [
        ["LastName", "ASC"],
        ["FirstName", "ASC"],
      ],
    });
    res.render("borrowers/list", {
      pageTitle: "Borrowers",
      borrowers: borrowers,
      layout: "web_layout",
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Error loading borrowers");
    res.redirect("/");
  }
};

// Show create form
exports.createBorrowerPage = (req, res) => {
  res.render("borrowers/create", {
    pageTitle: "Add New Borrower",
    layout: "web_layout",
  });
};

// Create new borrower
exports.createBorrower = async (req, res) => {
  try {
    const { FirstName, LastName, Email, Phone } = req.body;
    await Borrower.create({ FirstName, LastName, Email, Phone });
    req.flash("success", "Borrower created successfully!");
    res.redirect("/borrowers");
  } catch (err) {
    console.log(err);
    req.flash("error", "Error creating borrower");
    res.redirect("/borrowers/create");
  }
};

// Show edit form
exports.editBorrowerPage = async (req, res) => {
  try {
    const borrower = await Borrower.findByPk(req.params.id);
    if (!borrower) {
      req.flash("error", "Borrower not found");
      return res.redirect("/borrowers");
    }
    res.render("borrowers/edit", {
      pageTitle: "Edit Borrower",
      borrower: borrower,
      layout: "web_layout",
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Error loading borrower");
    res.redirect("/borrowers");
  }
};

// Update borrower
exports.updateBorrower = async (req, res) => {
  try {
    const { FirstName, LastName, Email, Phone } = req.body;
    const borrower = await Borrower.findByPk(req.params.id);
    if (!borrower) {
      req.flash("error", "Borrower not found");
      return res.redirect("/borrowers");
    }
    await borrower.update({ FirstName, LastName, Email, Phone });
    req.flash("success", "Borrower updated successfully!");
    res.redirect("/borrowers");
  } catch (err) {
    console.log(err);
    req.flash("error", "Error updating borrower");
    res.redirect("/borrowers");
  }
};

// Delete borrower
exports.deleteBorrower = async (req, res) => {
  try {
    const borrower = await Borrower.findByPk(req.params.id);
    if (!borrower) {
      req.flash("error", "Borrower not found");
      return res.redirect("/borrowers");
    }
    await borrower.destroy();
    req.flash("success", "Borrower deleted successfully!");
    res.redirect("/borrowers");
  } catch (err) {
    console.log(err);
    req.flash("error", "Error deleting borrower");
    res.redirect("/borrowers");
  }
};
