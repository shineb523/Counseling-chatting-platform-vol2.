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

        console.log('사용자 인증된 상태임.');
        console.log('req.session : ', req.session);

        var database = req.app.get('database');

        if (database.db) {
            console.log('데이터베이스 연결 성공.');

            var post_counselor_title_tmp = req.body.post_counselor_title;
            var post_counselor_type_write_tmp = req.body.post_counselor_type_write;
            var post_counselor_contents_tmp = req.body.post_counselor_contents;

            var counselor_posting_model_tmp = new database.counselor_posting_model({
                'counselor_posting_email': req.user.email,
                'counselor_posting_title': post_counselor_title_tmp,
                'counselor_posting_type_write': post_counselor_type_write_tmp,
                'counselor_posting_contents': post_counselor_contents_tmp,
                'counselor_posting_created': Date.now()
            });

            database.user_account_model.findOne({
                'email': signup_user_email
            }, function(err, user) {
                // 에러 발생 시
                if (err) {
                    console.log('update 함수 사용 중 에러');
                    res.redirect('/error_page');
                    return;
                }

                if (user.counselor_posting_bool == false) {

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
                            console.log('update 함수 사용 중 에러');
                            res.redirect('/error_page');
                            return;
                        }
                        console.log(result);
                        console.log('비밀번호 변경 완료.');
                    });

                    counselor_posting_model_tmp.save(function(err) {
                        if (err) {
                            console.log('save 함수 사용 중 에러');
                            res.redirect('/error_page');
                            return;
                        }
                    });
                }
            });

        } else {
            console.log('데이터베이스 연결 실패.');
            res.redirect('/database_connect_error_page');
            return;
        }

        res.redirect('/change_password_success_page');
        return;
    }
}
