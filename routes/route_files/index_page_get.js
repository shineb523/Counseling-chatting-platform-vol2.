// Index page.
module.exports = function(req, res) {
    console.log('/ path is called.');

    var database = req.app.get('database');

    if (database.db) {
        console.log('Database is successfully connected.');

        database.user_account_model.find({
            'withdrawal_boolean':true
        }, function(err, results) {
            console.log('find function is called.');
            if (err) {
                console.log(err);
                console.log('Error is occured while calling find function.');
                res.redirect('/error');
                return;
            }

            if (results) {
                console.log('Accounts in the process of withdrawal in database : ');
                console.dir(results);

                for (var i = 0; i < results.length; i++) {
                    if (results[i]._doc.withdrawal_boolean == true) {
                        var user_withdrawal_at = results[i]._doc.withdrawal_at;
                        var date_now = Date.now();
                        console.log('user_withdrawal_at : ', user_withdrawal_at);
                        console.log('date_now : ', date_now);

                        var withdrawal_day_diff = (date_now - user_withdrawal_at) / 1000 / 60 / 60 / 24;
                        console.log('withdrawal_day_diff : ', withdrawal_day_diff);

                        if (withdrawal_day_diff >= 14) {
                            database.user_account_model.deleteOne({ 'id':results[i]._doc.id }, function(err, resultObj) {
                                if (err) {
                                    console.log('Error is occured while calling deleteOne function.');
                                    throw err;
                                    return;
                                }

                                console.log('Deleted accounts which withdrew 2 weeks ago.')

                            });
                        }
                    }
                }

            } else {
                console.log('Withdrawn account does not exist in the database.');

            }

        });

    } else {
        console.log('Failed to connect to database.');
        res.redirect('/error_page');
        return;
    }

    console.log('Information from req.user.');
    console.dir(req.user);

    // Unauthorized case.
    if (!req.user) {
        console.log('User is not authenticated.');
        res.redirect('/index_not_signed_in_page');
        return;
    } else {
        console.log('User is authenticated');

        req.session.withdrawal_boolean=false;

        console.log('req.session', req.session);

        if(req.session.withdrawal_boolean==true){
                res.redirect('/already_withdrawn_account_page');
                return;
        }

        res.redirect('/index_signed_in_page');
        return;
    }



}
