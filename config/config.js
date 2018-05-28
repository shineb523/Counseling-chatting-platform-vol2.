 /*
  * 설정
  */

 module.exports = {

     server_port: 3000,

     db_url: 'mongodb://shineb523:831427@ds157641.mlab.com:57641/counseling_platform',

     db_schemas: [{
             file: './user_account_schema',
             collection: 'users_accounts',
             specified_collection_name: 'users_accounts',
             schemaName: 'user_account_schema',
             modelName: 'user_account_model'
         },
         {
             file: './user_withdrawal_reason_schema',
             collection: 'withdrawal_reasons',
             specified_collection_name: 'withdrawal_reasons',
             schemaName: 'user_withdrawal_reason_schema',
             modelName: 'user_withdrawal_reason_model'
         },
         {
             file: './counselor_article_schema',
             collection: 'counselor_articles',
             specified_collection_name: 'counselor_articles',
             schemaName: 'counselor_article_schema',
             modelName: 'counselor_article_model'
         },
         {
             file: './client_article_schema',
             collection: 'client_articles',
             specified_collection_name: 'client_articles',
             schemaName: 'client_article_schema',
             modelName: 'client_article_model'
         }
     ],

     route_info: [
         {
             method_file_path: '../routes/route_files/index_page_get',
             path: '/',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/index_not_signed_in_page_get',
             path: '/index_not_signed_in_page',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/index_signed_in_page_get',
             path: '/index_signed_in_page',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/signin_page_get',
             path: '/signin_page',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/signin_fail_page_get',
             path: '/signin_fail_page',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/find_account_page_get',
             path: '/find_account_page',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/signup_page_get',
             path: '/signup_page',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/logout_get',
             path: '/logout',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/current_password_confirm_changepwd_page_get',
             path: '/current_password_confirm_changepwd_page',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/current_password_confirm_fail_changepwd_page_get',
             path: '/current_password_confirm_fail_changepwd_page',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/current_password_confirm_changepwd_post',
             path: '/current_password_confirm_changepwd',
             type: 'post'
         },
         {
             method_file_path: '../routes/route_files/change_password_page_get',
             path: '/change_password_page',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/change_password_post',
             path: '/change_password',
             type: 'post'
         },
         {
             method_file_path: '../routes/route_files/change_password_success_page_get',
             path: '/change_password_success_page',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/signup_success_page_get',
             path: '/signup_success_page',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/error_page_get',
             path: '/error_page',
             type: 'get'
         }

     ],

     jsonrpc_api_path: '/api'
 }
