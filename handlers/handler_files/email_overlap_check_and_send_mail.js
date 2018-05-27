var database = require('../../database/database_loader');
var nodemailer = require('nodemailer');

var email_overlap_check_and_send_mail= function(params, callback) {
    console.log('jsonRPC email_overlap_check_and_send_mail 호출됨.');
    console.dir(params);

    if (database) {
        console.log('database 객체 참조됨.');
    } else {
        console.log('database 객체 참조 실패.');
        callback({
            code: 410,
            message: 'database 객체 참조 실패'
        }, null);
        return;
    }
    var output = new Array();
    // 등록된 사용자가 이미 있는 경우

    var signup_user_email = params[0];

    database.user_account_model.findOne({
        'email': signup_user_email
    }, function(err, user) {
        if (err) {
            console.log(err);
            console.log('Failed to call findOne function.');
                console.log('Failed to send email.');
                callback({
                    code: 420,
                    message: 'Failed to call findOne function.'
                }, null);
                return;
        }

        if (user) {
            console.log('이미 아이디가 존재함.');
            console.log('user : ', user);
            output[0] = 'o';
        } else {
            // 기존에 등록된 아이디가 없는 경우
            console.log('아이디가 존재하지 않음.');
            output[0] = 'x';

            function makeCode()
            {
                var email_confirm_code = "";
                var code_possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

                for( var i=0; i < 5; i++ ){
                    email_confirm_code += code_possible.charAt(Math.floor(Math.random() * code_possible.length));
                }
                console.log('Code : ', email_confirm_code);
                return email_confirm_code;
            }

            var mailing_bool = false;
            var code = makeCode();
            var email_text = 'Code : '+code;

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'rschbh12@gmail.com',
                    pass: 'xogml7102'
                }
            });

            var mailOptions = {
                from: 'rschbh12@gmail.com',
                to: signup_user_email,
                subject: 'Sending_mail_test_title',
                text: email_text
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                    console.log('Failed to send email.');
                    callback({
                        code: 430,
                        message: 'Failed to send email.'
                    }, null);
                    return;
                } else {
                    console.log('Email sent: ' + info.response);
                    mailing_bool = true;
                    output[1]=code;
                    output[2]=mailing_bool;
                    console.log('output : ', output);
                    callback(null, output);
                }
            });

        }

    });

};

module.exports = email_overlap_check_and_send_mail;
