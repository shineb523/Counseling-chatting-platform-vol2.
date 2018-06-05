var crypto = require('crypto');

var Schema = {};

Schema.createSchema = function(mongoose) {

    // 스키마 정의
    var withdrawal_schema = mongoose.Schema({
        withdrawal_email: {
            type: String,
            required: true,
            unique: true
        },
        withdrawal_at: {
            type: Date,
            required: true,
            default: Date.now()
        },
        withdrawal_reason_selected: {
            type: String,
            required: true,
            default: ''
        },
        withdrawal_reason_text: {
            type: String,
            required: true,
            default: ''
        }
    });

    console.log('withdrawal_schema 정의함.');

    return withdrawal_schema;
};

// module.exports에 withdrawal_schema 객체 직접 할당
module.exports = Schema;
