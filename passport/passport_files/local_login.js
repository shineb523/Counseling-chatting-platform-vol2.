/**
 * 패스포트 설정 파일
 *
 * 로컬 인증방식을 사용하는 패스포트 설정
 *
 * @date 2016-11-10
 * @author Mike
 */

var LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy({
    usernameField: 'signin_user_email',
    passwordField: 'signin_user_password',
    passReqToCallback: true // 이 옵션을 설정하면 아래 콜백 함수의 첫번째 파라미터로 req 객체 전달됨
}, function(req, signin_user_email, signin_user_password, done) {
    console.log('Local-login of passport is called.');

    var database = req.app.get('database');
    database.user_account_model.findOne({
        'email': signin_user_email
    }, function(err, user) {
        if (err) {
            return done(err);
        }

        // 등록된 사용자가 없는 경우
        if (!user) {
            console.log('Incorrect Email or PASSWORD.');
            return done(null, false); // 검증 콜백에서 두 번째 파라미터의 값을 false로 하여 인증 실패한 것으로 처리
        }

        // 비밀번호 비교하여 맞지 않는 경우
        var authenticated = user.authenticate(signin_user_password, user._doc.salt, user._doc.hashed_password);
        if (!authenticated) {
            console.log('Incorrect password');
            return done(null, false); // 검증 콜백에서 두 번째 파라미터의 값을 false로 하여 인증 실패한 것으로 처리
        }

        // 정상인 경우
        console.log('Successfully signed in.');

        return done(null, user); // 검증 콜백에서 두 번째 파라미터의 값을 user 객체로 넣어 인증 성공한 것으로 처리
    });

});
