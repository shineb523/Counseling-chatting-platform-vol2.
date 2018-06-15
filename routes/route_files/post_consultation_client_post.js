// Posting post_consultation_client_post.
module.exports = function(req, res) {

    console.log('/post_consultation path is called.');

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

    var post_client_title_tmp = req.body.post_client_title;
    var post_client_type_write_tmp = req.body.post_client_type_write;
    var post_client_contents_tmp = req.body.post_client_contents;

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
                    console.log('user.client_posting_bool : ', user.client_posting_bool);

                    database.user_account_model.update({
                        email: req.user.email
                    }, {
                        $set: {
                            'client_posting_title': post_client_title_tmp,
                            'client_posting_type_write': post_client_type_write_tmp,
                            'client_posting_contents': post_client_contents_tmp,
                            'client_posting_updated': Date.now()
                        }
                    }, function(err, result) {
                        if (err) {
                            console.log('Error is occured while calling update function.');
                            res.redirect('/error_page');
                            return;
                        }
                        console.log(result);
                    });

                    database.client_posting_model.update({
                        client_posting_email: req.user.email
                    }, {
                        $set: {
                            'client_posting_title': post_client_title_tmp,
                            'client_posting_type_write': post_client_type_write_tmp,
                            'client_posting_contents': post_client_contents_tmp,
                            'client_posting_updated': Date.now()
                        }
                    }, function(err, result) {
                        if (err) {
                            console.log('Error is occured while calling update function.');
                            res.redirect('/error_page');
                            return;
                        }
                        console.log(result);
                        console.log('Completed updating client posting.');

                    res.render('post_consultation_client.ejs', {
                        posting_complete_bool_rendering: 'client_posting_updated',
                        post_client_record_rendering: true,
                        post_client_title_rendering: post_client_title_tmp,
                        post_client_type_write_rendering: post_client_type_write_tmp,
                        post_client_contents_rendering: post_client_contents_tmp
                    });
                    return;
                });


            }else{
                console.log('user.client_posting_bool : ', user.client_posting_bool);
                database.user_account_model.update({
                    email: req.user.email
                }, {
                    $set: {
                        'client_posting_bool': true,
                        'client_posting_title': post_client_title_tmp,
                        'client_posting_type_write': post_client_type_write_tmp,
                        'client_posting_contents': post_client_contents_tmp,
                        'client_posting_created': Date.now()
                    }
                }, function(err, result) {
                    if (err) {
                        console.log('Error is occured while updating data to database.');
                        res.redirect('/error_page');
                        return;
                    }
                    console.log(result);
                });

                var client_posting_model_tmp = new database.client_posting_model({
                    'client_posting_email': req.user.email,
                    'client_posting_title': post_client_title_tmp,
                    'client_posting_type_write': post_client_type_write_tmp,
                    'client_posting_contents': post_client_contents_tmp,
                    'client_posting_created': Date.now()
                });

                client_posting_model_tmp.save(function(err) {
                    if (err) {
                        console.log('Error is occured while saving data to database.');
                        res.redirect('/error_page');
                        return;
                    }
                    console.log('Completed creating client posting.');
                    res.render('post_consultation_client.ejs', {
                        posting_complete_bool_rendering: 'client_posting_created',
                        post_client_record_rendering: true,
                        post_client_title_rendering: post_client_title_tmp,
                        post_client_type_write_rendering: post_client_type_write_tmp,
                        post_client_contents_rendering: post_client_contents_tmp
                    });
                    return;
                });
            }
        });

        } else {
            console.log('Failed to connect to database.');
            res.redirect('/database_connect_error_page');
            return;
        }
}
