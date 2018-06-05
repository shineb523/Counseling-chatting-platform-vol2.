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

            var post_consultation_title_tmp = req.body.post_consultation_title;
            var post_consultation_registrant_type_tmp = req.body.post_consultation_registrant_type;
            var post_consultation_type_write_tmp = req.body.post_consultation_type_write;
            var post_consultation_contents_tmp = req.body.post_consultation_contents;

            if(post_consultation_registrant_type_tmp=='counselor'){

                database.user_account_model.update({
                    email: req.user.email
                }, {
                    $set: {
                        counselor_posting_bool: true,
                        counselor_posting_title: post_consultation_title_tmp,
                        counselor_posting_type_write: post_consultation_type_write_tmp,
                        counselor_posting_contents: post_consultation_contents_tmp,
                        counselor_posting_created: Date.now()
                    }
                }, function(err, result) {
                    if (err) {
                        console.log('update 함수 사용 중 에러');
                        res.redirect('/error_page');
                        return;
                    }
                    console.log(result);
                    console.log('Posted successfully.');
                });

                database.counselor_posting_model.update({
                    email: req.user.email
                }, {
                    $set: {
                        counselor_posting_email: req.user.email,
                        counselor_posting_title: post_consultation_title_tmp,
                        counselor_posting_type_write: post_consultation_type_write_tmp,
                        counselor_posting_contents: post_consultation_contents_tmp,
                        counselor_posting_created: Date.now()
                    }
                }, function(err, result) {
                    if (err) {
                        console.log('update 함수 사용 중 에러');
                        res.redirect('/error_page');
                        return;
                    }
                    console.log(result);
                    console.log('Posted successfully.');
                });

            }else if(post_consultation_registrant_type_tmp=='client'){
                database.user_account_model.update({
                    email: req.user.email
                }, {
                    $set: {
                        client_posting_bool: true,
                        client_posting_title: post_consultation_title_tmp,
                        client_posting_type_write: post_consultation_type_write_tmp,
                        client_posting_contents: post_consultation_contents_tmp,
                        client_posting_created: Date.now()
                    }
                }, function(err, result) {
                    if (err) {
                        console.log('update 함수 사용 중 에러');
                        res.redirect('/error_page');
                        return;
                    }
                    console.log(result);
                    console.log('Posted successfully.');
                });

                database.client_posting_model.update({
                    email: req.user.email
                }, {
                    $set: {
                        client_posting_email: req.user.email,
                        client_posting_title: post_consultation_title_tmp,
                        client_posting_type_write: post_consultation_type_write_tmp,
                        client_posting_contents: post_consultation_contents_tmp,
                        client_posting_created: Date.now()
                    }
                }, function(err, result) {
                    if (err) {
                        console.log('update 함수 사용 중 에러');
                        res.redirect('/error_page');
                        return;
                    }
                    console.log(result);
                    console.log('Posted successfully.');
                });
            }
        } else {
            console.log('데이터베이스 연결 실패.');
            res.redirect('/database_connect_error_page');
            return;
        }

        res.redirect('/change_password_success_page');
        return;
    }
}
