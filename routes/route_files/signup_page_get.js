// Render sign_up page.
module.exports = function(req, res) {

    console.log('/signup_page path is called.');
    res.render('signup.ejs');
    return;
}
