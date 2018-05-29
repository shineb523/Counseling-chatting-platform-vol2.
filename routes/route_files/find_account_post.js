// 비밀번호 수정 시, 데이터베이스 수정.
module.exports = function(req, res) {

    var find_account_user_email = req.body.find_account_user_email;
    var find_account_new_password = req.body.find_account_new_password;

    console.log('/find_account path is called.');

    console.log('req.user의 정보');
    console.dir(req.user);

        console.log('사용자 인증된 상태임.');
		console.log('req.session : ', req.session);

        var database = req.app.get('database');

        if (database.db) {
            console.log('데이터베이스 연결 성공.');


            var tmp = new database.user_account_model({
                'password': find_account_new_password
            });

            database.user_account_model.update({
                email: find_account_user_email
            }, {
                $set: {
                    hashed_password: tmp.hashed_password,
                    salt: tmp.salt,
                    updated_at: tmp.created_at
                }
            }, function(err, result) {
                if (err) {
                    console.log('update 함수 사용 중 에러');
                    res.redirect('/error_page');
                    return;
                }
                console.log(result);
                console.log('비밀번호 변경 완료.');
                res.redirect('/change_password_success_page');
                return;
            });
        } else {
            console.log('데이터베이스 연결 실패.');
            res.redirect('/database_connect_error_page');
            return;
        }
}
