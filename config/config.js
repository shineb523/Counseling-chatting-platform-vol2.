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

     route_info: [{
             method_file_path: '../routes/route_files/current_password_confirm_changepwd_post',
             path: '/current_password_confirm_changepwd',
             type: 'post'
         },
         {
             method_file_path: '../routes/route_files/current_password_confirm_withdrawal_post',
             path: '/current_password_confirm_withdrawal',
             type: 'post'
         },
         {
             method_file_path: '../routes/route_files/modify_password_post',
             path: '/modify_password',
             type: 'post'
         },
         {
             method_file_path: '../routes/route_files/withdrawal_post',
             path: '/withdrawal',
             type: 'post'
         },
		 {
             method_file_path: '../routes/route_files/withdrawal_cancel_post',
             path: '/withdrawal_cancel',
             type: 'post'
         },
         {
             method_file_path: '../routes/route_files/create_room_post',
             path: '/create_room',
             type: 'post'
         },
         {
             method_file_path: '../routes/route_files/current_password_confirm_changepwd_get',
             path: '/current_password_confirm_changepwd',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/current_password_confirm_withdrawal_get',
             path: '/current_password_confirm_withdrawal',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/find_account_get',
             path: '/find_account',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/home_get',
             path: '/',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/logout_get',
             path: '/logout',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/signin_failed_authentication_get',
             path: '/signin_failed_authentication',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/signup_success_get',
             path: '/signup_success',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/signup_account_creation_get',
             path: '/signup_account_creation',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/withdrawal_reason_get',
             path: '/withdrawal_reason',
             type: 'get'
         },
		 {
             method_file_path: '../routes/route_files/already_withdrawn_account_get',
             path: '/already_withdrawn_account',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/current_password_confirm_failed_changepwd_get',
             path: '/current_password_confirm_failed_changepwd',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/current_password_confirm_failed_withdrawal_get',
             path: '/current_password_confirm_failed_withdrawal',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/index_signin_get',
             path: '/index_signin',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/modify_password_success_get',
             path: '/modify_password_success',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/modify_password_get',
             path: '/modify_password',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/my_profile_client_get',
             path: '/my_profile_client',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/my_profile_counselor_get',
             path: '/my_profile_counselor',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/withdrawal_cancel_success_get',
             path: '/withdrawal_cancel_success',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/withdrawal_success_get',
             path: '/withdrawal_success',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/counselors_room_list_get',
             path: '/counselors_room_list',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/clients_room_list_get',
             path: '/clients_room_list',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/create_room_get',
             path: '/create_room',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/join_chatting_room_get',
             path: '/chatting_room_joined',
             type: 'get'
         }

     ],

     jsonrpc_api_path: '/api'
 }