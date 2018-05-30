// 회원탈퇴 확인 시, 로그인 계정 데이터의 탈퇴 시간 저장, 탈퇴 여부 true로 변경.
module.exports = function(req, res) {

    console.log('/withdrawal 패스 요청됨.');

    console.log('req.user의 정보');
    console.dir(req.user);

    // 인증 안된 경우
    if (!req.user) {
        console.log('사용자 인증 안된 상태임.');
        res.redirect('/index_not_signed_in_page');
        return;
    } else {

        if (!req.session.check_withdrawal) {
            console.log('현재 비밀번호 확인되지 않음.');
            res.redirect('/current_password_confirm_withdrawal_page');
            return;
        }

        console.log('사용자 인증된 상태임.');
		console.log('req.session : ', req.session);

        var database = req.app.get('database');

        if (database.db) {
            console.log('데이터베이스 연결 성공.');

            var withdrawal_reason_selected_post = req.body.withdrawal_reason_selected;
            console.log('withdrawal_reason_selected_post', withdrawal_reason_selected_post);
            var withdrawal_reason_text_post = req.body.withdrawal_reason_text;
            console.log('withdrawal_reason_text_post', withdrawal_reason_text_post);

            database.user_account_model.update({
                email: req.user.email
            }, {
                $set: {
                    withdrawal_at: Date.now(),
                    withdrawal_boolean: true,
                    withdrawal_reason_selected: withdrawal_reason_selected_post,
                    withdrawal_reason_text: withdrawal_reason_text_post
                }
            }, function(err, result) {
                if (err) {
                    console.log('update 함수 사용 중 에러');
                    res.redirect('/error_page');
                    return;
                }
                console.log(result);
                console.log('회원탈퇴 삭제 날짜, 회원탈퇴 유무 업데이트 완료.');
            });

        } else {
            console.log('데이터베이스 연결 실패.');
            res.redirect('/database_connect_error_page');
            return;
        }

        res.redirect('/withdrawal_success_page');
        return;
    }
}
