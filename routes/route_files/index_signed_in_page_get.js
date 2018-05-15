// Index_page when user is signed in.
module.exports = function(req, res) {

    console.log('req.session', req.session);

    if(req.session.withdrawal_boolean==true){
            res.redirect('/already_withdrawn_account');
            return;
    }

    console.log('/index_signed_in_page path is called.');
    res.render('index_signed_in.ejs');
    return;
}
