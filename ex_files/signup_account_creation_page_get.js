// Render to signup_account_create page.
module.exports = function(req, res) {

    console.log('/signup_account_creation_page path is called.');
    res.render('signup_account_creation.ejs');
    return;
}
