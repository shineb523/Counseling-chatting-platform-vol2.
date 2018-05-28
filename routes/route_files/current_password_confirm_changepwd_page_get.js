// 비밀번호 수정 선택 시, 비밀번호 수정 페이지로 이동
module.exports = function(req, res) {

    // 인증 안된 경우
    if (!req.user) {
        console.log('사용자 인증 안된 상태임.');
        res.redirect('/index_not_signed_in_page');
        return;
    }

    console.log('req.session', req.session);

    if(req.session.withdrawal_boolean==true){
            res.redirect('/already_withdrawn_account_page');
            return;
    }

    console.log('/current_password_confirm_changepwd_page path is called.');
    res.render('current_password_confirm_changepwd.ejs');
    return;
}
