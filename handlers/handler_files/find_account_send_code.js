var database = require('../../database/database_loader');
var nodemailer = require('nodemailer');

var find_account_send_code= function(params, callback) {
    console.log('jsonRPC find_account_send_code 호출됨.');
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

    var find_account_user_email = params[0];

    database.user_account_model.findOne({
        'email': find_account_user_email
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

        if (!user) {
            // 기존에 등록된 아이디가 없는 경우
            console.log('가입되지 않은 이메일.');
            output[0] = 'x';
            callback(null, output);
            return;
        } else {
            console.log('이메일이 존재함.');
            console.log('user : ', user);
            output[0] = 'o';

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
            var email_text = 'Please enter this code : '+code;

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'rschbh12@gmail.com',
                    pass: 'xogml7102'
                }
            });

            var mailOptions = {
                from: 'rschbh12@gmail.com',
                to: find_account_user_email,
                subject: 'CP email confirm CODE.',
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
                    return;
                }
            });

        }

    });

};

module.exports = find_account_send_code;
