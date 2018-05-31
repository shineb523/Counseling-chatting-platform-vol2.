// If a user signup successfully, render signup_success.ejs with object of user.
module.exports = function(req, res) {

    console.log('/signup_success_page path is called.');

    // 인증 안된 경우
    if (!req.user) {
        console.log('사용자 인증 안된 상태임.');
        res.redirect('/index_not_signed_in_page');
        return;
    } else {

        console.log('사용자 인증된 상태임.');

        var database = req.app.get('database');

        if (database.db) {
            console.log('데이터베이스 연결 성공.');

            database.user_account_model.update({
                email: req.user.email
            }, {
                $set: {
                    withdrawal_boolean: false
                }
            }, function(err, result) {
                if (err) {
                    console.log('update 함수 사용 중 에러');
                    res.redirect('/error_page');
                    return;
                }
                console.log(result);
                console.log('회원탈퇴 유무 업데이트 완료.');
                res.render('signup_success.ejs', {
                    user: req.user
                });
                return;
            });

        } else {
            console.log('데이터베이스 연결 실패.');
            res.redirect('/database_connect_error_page');
            return;
        }
    }
}
