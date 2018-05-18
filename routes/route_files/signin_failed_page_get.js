// If sign-in fails, ID password confirmation message is output.
module.exports = function(req, res) {

    console.log('/signin_failed_page path is called.');
    res.render('index_signin_failed.ejs');
    return;
}
