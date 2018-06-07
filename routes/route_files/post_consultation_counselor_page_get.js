// 회원탈퇴 선택 시, 회원탈퇴 사유 제출 페이지로 이동
module.exports = function(req, res) {

    // 인증 안된 경우
    if (!req.user) {
        console.log('사용자 인증 안된 상태임.');
        res.redirect('/index_not_signed_in_page');
        return;
    }

    console.log('req.session', req.session);

    if (req.session.withdrawal_boolean == true) {
        res.redirect('/already_withdrawn_account_page');
        return;
    }

    console.log('/post_consultation_counselor_page path is called.');

    var database = req.app.get('database');
    if (database.db) {
        console.log('데이터베이스 연결 성공.');

        database.counselor_posting_model.findOne({
            'email': req.user.email
        }, function(err, result) {
            // 에러 발생 시
            if (err) {
                console.log('findOne 함수 사용 중 에러');
                res.redirect('/error_page');
                return;
            }
            if (result) {
                console.log('기존 counselor_posting 존재.');
                res.render('post_consultation_counselor.ejs', {
                    post_counselor_record_rendering: true,
                    post_counselor_title_rendering: result.counselor_posting_title,
                    post_counselor_type_write_rendering: result.counselor_posting_type_write,
                    post_counselor_contents_rendering: result.counselor_posting_contents
                });
                return;
            } else {
                console.log('기존 counselor_posting 존재하지 않음.');
                res.render('post_consultation_counselor.ejs', {
                    post_counselor_record_rendering: false,
                    post_counselor_title_rendering: false,
                    post_counselor_type_write_rendering: false,
                    post_counselor_contents_rendering: false

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
