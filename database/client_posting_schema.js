var crypto = require('crypto');

var Schema = {};

Schema.createSchema = function(mongoose) {

    // 스키마 정의
    var client_posting_schema = mongoose.Schema({
        client_posting_email: {
            type: String,
            required: true,
            unique: true
        },
        client_posting_title: {
            type: String,
            required: true
        },
        client_posting_type_write: {
            type: String,
            required: true
        },
        client_posting_contents: {
            type: String,
            required: true
        },
        client_posting_created: {
            type: Date,
            required: true,
            default: Date.now()
        },
        client_posting_updated: {
            type: Date
        }
    });

    console.log('client_posting_schema 정의함.');

    return client_posting_schema;
};

// module.exports에 client_posting_schema 객체 직접 할당
module.exports = Schema;