// Rendering post_consultation_client.ejs.
module.exports = function(req, res) {

    console.log('/post_consultation_client_page path is called.');

    console.log('Information of req.user');
    console.dir(req.user);

    // If user is not authenticated.
    if (!req.user) {
        console.log('User is not authenticated.');
        res.redirect('/index_not_signed_in_page');
        return;
    }

    console.log('req.session', req.session);

    if (req.session.withdrawal_boolean == true) {
        res.redirect('/already_withdrawn_account_page');
        return;
    }

    var database = req.app.get('database');

    if (database.db) {
        console.log('Successfully connected to database.');

        database.user_account_model.findOne({
            'email': req.user.email
        }, function(err, user) {
            // If an error occurs.
            if (err) {
                console.log('Error is occured while calling findOne function.');
                res.redirect('/error_page');
                return;
            }

            if (user.client_posting_bool == true) {
                res.render('post_consultation_client.ejs', {
                    posting_complete_bool_rendering: 'none',
                    post_client_record_rendering: true,
                    post_client_title_rendering: user.client_posting_title,
                    post_client_type_write_rendering: user.client_posting_type_write,
                    post_client_contents_rendering: user.client_posting_contents
                });
                return;
            } else {
                res.render('post_consultation_client.ejs', {
                    posting_complete_bool_rendering: 'none',
                    post_client_record_rendering: false,
                    post_client_title_rendering: '',
                    post_client_type_write_rendering: '',
                    post_client_contents_rendering: ''
                });
                return;
            }


        });

    } else {
        console.log('데이터베이스 연결 실패.');
        res.redirect('/database_connect_error_page');
        return;
    }
}
