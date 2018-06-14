var database = require('../../database/database_loader');

var setting_posting_page_forms= function(params, callback) {
    console.log('jsonRPC setting_posting_page_forms 호출됨.');
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

    var posting_type = params[0];
    var user_email = params[1];
    console.log('posting_type : ', posting_type);
    console.log('user_email : ', user_email);

    if(posting_type == 'counselor'){
        database.user_account_model.findOne({
            'email': user_email
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
            console.log('user : ', user);
            callback(null, user);
            return;

        });
    }else if(posting_type == 'client'){

    }

};

module.exports = setting_posting_page_forms;
