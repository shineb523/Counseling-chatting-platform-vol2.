// If logout is called, log out and redirect to index_page_get.

module.exports = function(req, res) {
    console.log('/logout path is called.');
    req.session.destroy();
    res.clearCookie();
    res.redirect('/');
    return;
}
