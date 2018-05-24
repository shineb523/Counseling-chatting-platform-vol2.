var nodemailer = require('nodemailer');

var send_email = function(params, callback) {
    console.log('Send_email is called.');
    console.dir(params);

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

    var signup_user_email = params[0];
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
        to: 'rschbh12@naver.com',
        subject: 'Sending_mail_test_title',
        text: 'test text'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            console.log('Failed to send email.');
            callback({
                code: 430,
                message: 'Failed to send email.'
            }, null);
            throw err;
            return;
        } else {
            console.log('Email sent: ' + info.response);
            mailing_bool = true;
            var output=new Array();
            output[0]=code;
            output[1]=mailing_bool;
            callback(null, output);
        }
    });

};

module.exports = send_email;
