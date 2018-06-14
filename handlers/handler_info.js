console.log('handler_info 파일 로딩됨.');

module.exports = [{
    file: './handler_files/email_overlap_check_and_send_mail',
    method: 'email_overlap_check_and_send_mail'
},
{
    file: './handler_files/find_account_send_code',
    method: 'find_account_send_code'
},
{
    file: './handler_files/setting_posting_page_forms',
    method: 'setting_posting_page_forms'
}
];
