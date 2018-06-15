// Posting post_consultation_counselor_post.
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

    var post_counselor_title_tmp = req.body.post_counselor_title;
    var post_counselor_type_write_tmp = req.body.post_counselor_type_write;
    var post_counselor_contents_tmp = req.body.post_counselor_contents;

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

                if (user.counselor_posting_bool == true) {
                    console.log('user.counselor_posting_bool : ', user.counselor_posting_bool);

                    database.user_account_model.update({
                        email: req.user.email
                    }, {
                        $set: {
                            'counselor_posting_title': post_counselor_title_tmp,
                            'counselor_posting_type_write': post_counselor_type_write_tmp,
                            'counselor_posting_contents': post_counselor_contents_tmp,
                            'counselor_posting_updated': Date.now()
                        }
                    }, function(err, result) {
                        if (err) {
                            console.log('Error is occured while calling update function.');
                            res.redirect('/error_page');
                            return;
                        }
                        console.log(result);
                    });

                    database.counselor_posting_model.update({
                        counselor_posting_email: req.user.email
                    }, {
                        $set: {
                            'counselor_posting_title': post_counselor_title_tmp,
                            'counselor_posting_type_write': post_counselor_type_write_tmp,
                            'counselor_posting_contents': post_counselor_contents_tmp,
                            'counselor_posting_updated': Date.now()
                        }
                    }, function(err, result) {
                        if (err) {
                            console.log('Error is occured while calling update function.');
                            res.redirect('/error_page');
                            return;
                        }
                        console.log(result);
                        console.log('Completed updating counselor posting.');

                    res.render('post_consultation_counselor.ejs', {
                        posting_complete_bool_rendering: 'counselor_posting_updated',
                        post_counselor_record_rendering: true,
                        post_counselor_title_rendering: post_counselor_title_tmp,
                        post_counselor_type_write_rendering: post_counselor_type_write_tmp,
                        post_counselor_contents_rendering: post_counselor_contents_tmp
                    });
                    return;
                });


            }else{
                console.log('user.counselor_posting_bool : ', user.counselor_posting_bool);
                database.user_account_model.update({
                    email: req.user.email
                }, {
                    $set: {
                        'counselor_posting_bool': true,
                        'counselor_posting_title': post_counselor_title_tmp,
                        'counselor_posting_type_write': post_counselor_type_write_tmp,
                        'counselor_posting_contents': post_counselor_contents_tmp,
                        'counselor_posting_created': Date.now()
                    }
                }, function(err, result) {
                    if (err) {
                        console.log('Error is occured while updating data to database.');
                        res.redirect('/error_page');
                        return;
                    }
                    console.log(result);
                });

                var counselor_posting_model_tmp = new database.counselor_posting_model({
                    'counselor_posting_email': req.user.email,
                    'counselor_posting_title': post_counselor_title_tmp,
                    'counselor_posting_type_write': post_counselor_type_write_tmp,
                    'counselor_posting_contents': post_counselor_contents_tmp,
                    'counselor_posting_created': Date.now()
                });

                counselor_posting_model_tmp.save(function(err) {
                    if (err) {
                        console.log('Error is occured while saving data to database.');
                        res.redirect('/error_page');
                        return;
                    }
                    console.log('Completed creating counselor posting.');
                    res.render('post_consultation_counselor.ejs', {
                        posting_complete_bool_rendering: 'counselor_posting_created',
                        post_counselor_record_rendering: true,
                        post_counselor_title_rendering: post_counselor_title_tmp,
                        post_counselor_type_write_rendering: post_counselor_type_write_tmp,
                        post_counselor_contents_rendering: post_counselor_contents_tmp
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
