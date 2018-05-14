// Import Express base modules.
var express = require('express'),
    http = require('http'),
    path = require('path');

// Import Express middle-wares.
var bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    static = require('serve-static'),
    errorHandler = require('errorhandler');

// Import error-handler module.
var expressErrorHandler = require('express-error-handler');

// Import Session middle-ware.
var expressSession = require('express-session');

// Import Passport modules.
var passport = require('passport');

// Import configuration file seperated into module.
var config = require('./config/config');

// Import configuration file seperated into module.
var database = require('./database/database_loader');

// Import routing file seperated into module.
var route_loader = require('./routes/route_loader');

// Import handler module.
var handler_loader = require('./handlers/handler_loader');

// Import json module.
var jayson = require('jayson');

// Import socket.io module.
var socketio = require('socket.io');

// Import cors module.
var cors = require('cors');

// Create Express object.
var app = express();

app.use(cors());

// Configure view engine.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
console.log('The view engine is set to ejs.');

// Set port number.
app.set('port', process.env.PORT || 3000);

// Parsing application/x-www-form-urlencoded using body-parser.
app.use(bodyParser.urlencoded({
    extended: false
}))

// Parsing application/json using body-parser.
app.use(bodyParser.json())

// Open public folder as static.
app.use('/public', static(path.join(__dirname, 'public')));

// Configure cookie-parser.
app.use(cookieParser());

// Configure Session.
app.use(expressSession({
    key: 'sid',
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

// Configure Session.
// Before you use Passport sessions, you must have code that uses Express's session before.
app.use(passport.initialize());
app.use(passport.session());

// Routing information is loaded to configure routing.
var router = express.Router();
route_loader(app, router);

// Configure Passport.
var configPassport = require('./passport/passport_init');
configPassport(app, router, passport);


var jsonrpc_api_path = config.jsonrpc_api_path || '/api';
handler_loader(jayson, app, jsonrpc_api_path);
console.log('Set JSON-RPC to be used in [' + jsonrpc_api_path + '] path.');

// 404 error page handling.
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

//===== Start server. =====//

// Unchecked exception handling - keeps the server process intact.
process.on('uncaughtException', function(err) {
    console.log('uncaughtException occured : ' + err);
    console.log('Keeps the server process intact.');

    console.log(err);
});

// Disconnect database at process termination.
process.on('SIGTERM', function() {
    console.log("The process is terminated.");
    app.close();
});

// The Express server object is terminated when app is closed.
app.on('close', function() {
    console.log("The Express server object is terminated.");
    if (database.db) {
        database.db.close();
    }
});

// Causes an object on the started server to be returned.
var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('The server has started. Port : ' + app.get('port'));

    // Initialize database.
    database.init(app, config);

});



// var io=socketio.listen(server);
// console.log('socket.io 요청을 받아들일 준비가 되었습니다.');
//
//
// // 클라이언트가 연결했을 때의 이벤트 처리
// io.sockets.on('connection', function(socket){
//     console.log('connection info : ', socket.request.connection._peername);
//
//     // 소켓 객체에 클라이언트 Host, Port 정보 속성으로 추가
//     socket.remoteAddress=socket.request.connection._peername.address;
//     socket.remotePort=socket.request.connection._peername.port;
//
//     socket.on('room', function(room){
//         console.log('room 이벤트를 받았습니다.');
//         console.dir(room);
//
//
//
//         if(room.command == 'create'){
//             console.log('io.sockets.adapter.rooms[room.room_creator_id] : ', io.sockets.adapter.rooms[room.room_creator_id]);
//             if(io.sockets.adapter.rooms[room.room_creator_id]){
//                 console.log('해당 아이디로 이미 방이 만들어져 있습니다.');
//
//                 socket.emit('already_room_creating_id');
//
//                 getRoomList();
//
//             }else{
//                 console.log('방을 새로 만듭니다.');
//
//                 socket.join(room.room_creator_id);
//
//
//                 socket.user_id=room.room_creator_id;
//
//                 var curRoom=io.sockets.adapter.rooms[room.room_creator_id];
//                 curRoom.room_creator_id=room.room_creator_id;
//                 curRoom.room_creator_type=room.room_creator_type;
//                 curRoom.room_title=room.room_title;
//                 curRoom.counsel_type=room.counsel_type;
//                 curRoom.max_number_of_joining_ids=2;
//                 curRoom.joining_ids=[room.room_creator_id];
//                 curRoom.socket_id=socket.id;
//
//                 getRoomList();
//             }
//         }else if(room.command == 'check'){
//             console.log('접속한 방의 정보를 조회합니다.');
//
//             var curRoom=io.sockets.adapter.rooms[room.room_creator_id];
//             var room_info_obj={ room_creator_type:curRoom.room_creator_type, room_title:curRoom.room_title,
//             counsel_type:curRoom.counsel_type };
//             socket.emit('room_info', room_info_obj);
//
//         }else if(room.command == 'update'){
//
//             // var curRoom=io.sockets.adapter.rooms[room.room_creator_id];
//             // curRoom.room_creator_id=room.room_creator_id;
//             // curRoom.room_creator_type=room.room_creator_type;
//             // curRoom.room_title=room.room_title;
//
//         }else if(room.command == 'delete'){
//
//             if (io.sockets.adapter.rooms[room.room_creator_id]) { // 방이  만들어져 있는 경우
//             	delete io.sockets.adapter.rooms[room.room_creator_id];
//                 console.log('방을 삭제했습니다.');
//                 getRoomList();
//             } else {  // 방이  만들어져 있지 않은 경우
//             	console.log('방이 만들어져 있지 않습니다.');
//                 getRoomList();
//             }
//
//         } else if (room.command === 'join') {  // 방에 입장하기 요청
//
//             console.log('room.selected_room_creator_id : ', room.selected_room_creator_id);
//
//             socket.user_id=room.joining_id;
//
//             var curRoom=io.sockets.adapter.rooms[room.selected_room_creator_id];
//
//             if((curRoom.joining_ids).indexOf(room.joining_id) != -1){
//                 // when joining_id already exists in selected chatting room.
//                 socket.join(room.selected_room_creator_id);
//                 getRoomList();
//             }else{
//                 if((curRoom.joining_ids).length == curRoom.max_number_of_joining_ids){
//                     socket.emit('join_err_full');
//                     getRoomList();
//                 }else{
//                     socket.join(room.selected_room_creator_id);
//                     (curRoom.joining_ids).push(room.joining_id);
//                     getRoomList();
//                 }
//             }
//
//         } else if (room.command === 'leave') {  // 방 나가기 요청
//
//             	var curRoom=io.sockets.adapter.rooms[room.room_creator_id];
//                 // console.log('io.sockets.adapter.rooms[roomId]', outRoom);
//             	// find default room using all attributes
//             	var user_id_count=0;
//                 Object.keys(curRoom).forEach(function(socket) {
//                 	if (socket.user_id == room.joining_id) {
//                 		user_id_count++;
//                 	}
//                 });
//
//             if(user_id_count>=2){
//                 socket.leave(room.room_creator_id);
//                 var room_creator_type = curRoom.room_creator_type;
//                 socket.emit('leave_redirect', String(room_creator_type));
//                 getRoomList();
//                 // send response message
//                 sendResponse(socket, 'room', '200', '방에서 나갔습니다.');
//             }else{
//                 if(room.room_creator_id==room.joining_id){
//                     socket.leave(room.room_creator_id);
//                     var room_creator_type = curRoom.room_creator_type;
//                     socket.emit('leave_redirect', String(room_creator_type));
//                     getRoomList();
//                     // send response message
//                     sendResponse(socket, 'room', '200', '방에서 나갔습니다.');
//                 }else{
//                     (curRoom.joining_ids).splice(((curRoom.joining_ids).indexOf(room.joining_id)),1);
//                     socket.leave(room.room_creator_id);
//                     var room_creator_type = curRoom.room_creator_type;
//                     socket.emit('leave_redirect', String(room_creator_type));
//                     getRoomList();
//                     // send response message
//                     sendResponse(socket, 'room', '200', '방에서 나갔습니다.');
//                 }
//             }
//
//         }
//     });
//
//     socket.on('chat', function(chat){
//         console.log('received chat event.');
//         // Sending message in chatting room.
//         if(chat.command==='chat_server_receiving'){
//             console.log('received chat_server_receiving event.')
//
//             console.log('chat.joining_room_creator_id : ', chat.joining_room_creator_id);
//
//             var message_data = {message_sender:chat.message_sender, message:chat.message_data};
//             (io.sockets.in(chat.joining_room_creator_id)).emit('chat_client_receiving', message_data);
//             console.log('emitted chat_client_receiving event.');
//         }
//     });
//
//     socket.on('request_room_list_counselor', function(){
//         console.log('received request_room_list event.');
//
//         console.dir(io.sockets.adapter.rooms);
//
//         var roomList = [];
//         var idList = [];
//
//         Object.keys(io.sockets.adapter.rooms).forEach(function(roomId) { // for each room
//         	// console.log('current room id : ' + roomId);
//         	var outRoom = io.sockets.adapter.rooms[roomId];
//
//             // console.log('io.sockets.adapter.rooms[roomId]', outRoom);
//         	// find default room using all attributes
//         	var foundExcept = false;
//
//             if(outRoom['room_creator_type']=='client'){
//                 foundExcept = true;
//             }
//
//
//             Object.keys(outRoom.sockets).forEach(function(key) {
//             	// console.log('#' + index + ' : ' + key + ', ' + outRoom.sockets[key]);
//
//             	if (roomId == key ) {  // logined_id
//             		foundExcept = true;
//                     idList.push(outRoom);
//             	}
//
//             });
//
//             if (!foundExcept) {
//             	roomList.push(outRoom);
//             }
//         });
//
//         console.log('\n\n==================[LOGIN ID LIST]==================\n');
//         console.dir(idList);
//         console.log('\n===================================================\n\n');
//         console.log('\n\n====================[ROOM LIST]====================\n');
//         console.dir(roomList);
//         console.log('\n===================================================\n\n');
//
//         socket.emit('room_list_counselor', roomList);
//     });
//
//
//     socket.on('request_room_list_client', function(){
//         console.log('received request_room_list event.');
//
//         console.dir(io.sockets.adapter.rooms);
//
//         var roomList = [];
//         var idList = [];
//
//         Object.keys(io.sockets.adapter.rooms).forEach(function(roomId) { // for each room
//         	// console.log('current room id : ' + roomId);
//         	var outRoom = io.sockets.adapter.rooms[roomId];
//
//             // console.log('io.sockets.adapter.rooms[roomId]', outRoom);
//         	// find default room using all attributes
//         	var foundExcept = false;
//
//             if(outRoom['room_creator_type']=='counselor'){
//                 foundExcept = true;
//             }
//
//
//             Object.keys(outRoom.sockets).forEach(function(key) {
//             	// console.log('#' + index + ' : ' + key + ', ' + outRoom.sockets[key]);
//
//             	if (roomId == key ) {  // logined_id
//             		foundExcept = true;
//                     idList.push(outRoom);
//             	}
//
//             });
//
//             if (!foundExcept) {
//             	roomList.push(outRoom);
//             }
//         });
//         console.log('\n\n==================[LOGIN ID LIST]==================\n');
//         console.dir(idList);
//         console.log('\n===================================================\n\n');
//         console.log('\n\n====================[ROOM LIST]====================\n');
//         console.dir(roomList);
//         console.log('\n===================================================\n\n');
//
//         socket.emit('room_list_client', roomList);
//     });
//
// });
//
// function getRoomList() {
//
// 	console.dir(io.sockets.adapter.rooms);
//
//     var roomList = [];
//     var idList = [];
//
//     Object.keys(io.sockets.adapter.rooms).forEach(function(roomId) { // for each room
//     	// console.log('current room id : ' + roomId);
//     	var outRoom = io.sockets.adapter.rooms[roomId];
//
//         // console.log('io.sockets.adapter.rooms[roomId]', outRoom);
//     	// find default room using all attributes
//     	var foundDefault = false;
//
//         Object.keys(outRoom.sockets).forEach(function(key) {
//
//
//         	if (roomId == key) {   // logined_id
//         		foundDefault = true;
//                 idList.push(outRoom);
//         	}
//
//         });
//
//         if (!foundDefault) {
//         	roomList.push(outRoom);
//         }
//     });
//
//     console.log('\n\n==================[LOGIN ID LIST]==================\n');
//     console.dir(idList);
//     console.log('\n===================================================\n\n');
//     console.log('\n\n====================[ROOM LIST]====================\n');
//     console.dir(roomList);
//     console.log('\n===================================================\n\n');
// }
//
// // 응답 메시지 전송 메소드
// function sendResponse(socket, command, code, message) {
// 	var statusObj = {command: command, code: code, message: message};
// 	socket.emit('response', statusObj);
// }
