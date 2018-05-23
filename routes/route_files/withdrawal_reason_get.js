// 회원탈퇴 선택 시, 회원탈퇴 사유 제출 페이지로 이동
module.exports = function(req, res) {

    // Not signed in.
    if (!req.user) {
        console.log('User is not signed in.');
        res.redirect('/index_signin');
        return;
    }

    console.log('req.session', req.session);

    if(req.session.withdrawal_boolean==true){
            res.redirect('/already_withdrawn_account_page');
            return;
    }

    console.log('/withdrawal_reason 패스 요청됨.');
    res.render('withdrawal_reason.ejs');
    return;
}
