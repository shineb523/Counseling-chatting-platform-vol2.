// 회원탈퇴 선택 시, 회원탈퇴 사유 제출 페이지로 이동
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

    if(req.session.check_changepwd!=true){
            res.redirect('/current_password_confirm_changepwd_page');
            return;
    }

    console.log('/change_password_page path is called.');
    res.render('change_password_success.ejs');
    return;
}
