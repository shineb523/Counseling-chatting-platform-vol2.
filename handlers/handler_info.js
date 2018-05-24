console.log('handler_info 파일 로딩됨.');

module.exports = [{
    file: './handler_files/id_overlap_check',
    method: 'id_overlap_check'
},
{
    file: './handler_files/send_email',
    method: 'send_email'
}
];
