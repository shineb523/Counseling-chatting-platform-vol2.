var crypto = require('crypto');

var Schema = {};

Schema.createSchema = function(mongoose) {

    // 스키마 정의
    var client_posting_schema = mongoose.Schema({
        withdrawal_reason_selected: {
            type: String,
            'default': ''
        },
        withdrawal_reason_text: {
            type: String,
            'default': ''
        }
    });

    console.log('client_posting_schema 정의함.');

    return client_posting_schema;
};

// module.exports에 client_posting_schema 객체 직접 할당
module.exports = Schema;
