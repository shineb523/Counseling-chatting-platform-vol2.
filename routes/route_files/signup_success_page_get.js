// If a user signup successfully, render signup_success.ejs with object of user.
module.exports = function(req, res) {

    console.log('/signup_success_page path is called.');
    res.render('signup_success.ejs', {
        user: req.user
    });
    return;
}
