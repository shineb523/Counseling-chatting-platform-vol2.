// error_page_get routing file.
module.exports = function(req, res) {
    console.log('/error_page path is called');
    res.render('error.ejs');
    return;
}
