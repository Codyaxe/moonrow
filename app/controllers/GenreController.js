const Genre = require("../models/Genre");

// List all genres
exports.listGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll({
      order: [["GenreName", "ASC"]],
    });
    res.render("genres/list", {
      pageTitle: "Genres",
      genres: genres,
      layout: "web_layout",
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Error loading genres");
    res.redirect("/");
  }
};

// Show create form
exports.createGenrePage = (req, res) => {
  res.render("genres/create", {
    pageTitle: "Add New Genre",
    layout: "web_layout",
  });
};

// Create new genre
exports.createGenre = async (req, res) => {
  try {
    const { GenreName } = req.body;
    await Genre.create({ GenreName });
    req.flash("success", "Genre created successfully!");
    req.session.save(() => {
      res.redirect("/genres");
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Error creating genre");
    req.session.save(() => {
      res.redirect("/genres/create");
    });
  }
};

// Show edit form
exports.editGenrePage = async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) {
      req.flash("error", "Genre not found");
      return res.redirect("/genres");
    }
    res.render("genres/edit", {
      pageTitle: "Edit Genre",
      genre: genre,
      layout: "web_layout",
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Error loading genre");
    res.redirect("/genres");
  }
};

// Update genre
exports.updateGenre = async (req, res) => {
  try {
    const { GenreName } = req.body;
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) {
      req.flash("error", "Genre not found");
      return req.session.save(() => {
        res.redirect("/genres");
      });
    }
    await genre.update({ GenreName });
    req.flash("success", "Genre updated successfully!");
    req.session.save(() => {
      res.redirect("/genres");
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Error updating genre");
    req.session.save(() => {
      res.redirect("/genres");
    });
  }
};

// Delete genre
exports.deleteGenre = async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) {
      req.flash("error", "Genre not found");
      return req.session.save(() => {
        res.redirect("/genres");
      });
    }
    await genre.destroy();
    req.flash("success", "Genre deleted successfully!");
    req.session.save(() => {
      res.redirect("/genres");
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Error deleting genre");
    req.session.save(() => {
      res.redirect("/genres");
    });
  }
};
