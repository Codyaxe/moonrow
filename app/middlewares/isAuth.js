module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    req.flash(
      "error",
      "You must log in to access the dashboard and manage library data."
    );
    return res.redirect("/login");
  }
  next();
};
