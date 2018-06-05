var crypto = require('crypto');

var Schema = {};

Schema.createSchema = function(mongoose) {

    // 스키마 정의
    var counselor_posting_schema = mongoose.Schema({
        counselor_posting_email: {
            type: String,
            required: true,
            unique: true
        },
        counselor_posting_title: {
            type: String,
            required: true
        },
        counselor_posting_type_write: {
            type: String,
            required: true
        },
        counselor_posting_contents: {
            type: String,
            required: true
        },
        counselor_posting_created: {
            type: Date,
            required: true,
            default: Date.now()
        },
        counselor_posting_updated: {
            type: Date
        }
    });

    console.log('counselor_posting_schema 정의함.');

    return counselor_posting_schema;
};

// module.exports에 counselor_posting_schema 객체 직접 할당
module.exports = Schema;
