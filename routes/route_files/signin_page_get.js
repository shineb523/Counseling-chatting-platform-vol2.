// Render sign_in page.
module.exports = function(req, res) {

    console.log('/signin_page path is called.');
    res.render('signin.ejs');
    return;
}
