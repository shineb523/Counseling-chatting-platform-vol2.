module.exports = function(req, res) {

    console.log('/post_consultation path is called.');

    console.log('req.user의 정보');
    console.dir(req.user);

    // 인증 안된 경우
    if (!req.user) {
        console.log('사용자 인증 안된 상태임.');
        res.redirect('/index_not_signed_in_page');
        return;

    } else {

        var posting_complete_bool = 'none';

        console.log('사용자 인증된 상태임.');
        console.log('req.session : ', req.session);

        var database = req.app.get('database');

        if (database.db) {
            console.log('데이터베이스 연결 성공.');

            var post_client_title_tmp = req.body.post_client_title;
            var post_client_type_write_tmp = req.body.post_client_type_write;
            var post_client_contents_tmp = req.body.post_client_contents;

            database.user_account_model.findOne({
                'email': req.user.email
            }, function(err, user) {
                // 에러 발생 시
                if (err) {
                    console.log('update 함수 사용 중 에러');
                    res.redirect('/error_page');
                    return;
                }

                if (user.client_posting_bool == false) {

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
                            console.log('update 함수 사용 중 에러');
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
                            console.log('save 함수 사용 중 에러');
                            res.redirect('/error_page');
                            return;
                        }
                        console.log('Completed creating client posting.');
                        posting_complete_bool='client_posting_created';
                        res.render('post_consultation_client.ejs', {
                            posting_complete_bool_rendering:posting_complete_bool,
                            post_client_record_rendering: true,
                            post_client_title_rendering: post_client_title_tmp,
                            post_client_type_write_rendering: post_client_type_write_tmp,
                            post_client_contents_rendering: post_client_contents_tmp
                        });
                        return;
                    });
                }else{
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
                            console.log('update 함수 사용 중 에러');
                            res.redirect('/error_page');
                            return;
                        }
                        console.log(result);
                        console.log('Completed updating client posting.');
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
                            console.log('update 함수 사용 중 에러');
                            res.redirect('/error_page');
                            return;
                        }
                        console.log(result);
                        console.log('Completed updating client posting.');
                        posting_complete_bool='client_posting_updated';
                        res.render('post_consultation_client.ejs', {
                            posting_complete_bool_rendering:posting_complete_bool,
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
            console.log('데이터베이스 연결 실패.');
            res.redirect('/database_connect_error_page');
            return;
        }
    }
}
