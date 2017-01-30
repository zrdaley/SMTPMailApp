'use strict';
var SMTPServer = require('smtp-server').SMTPServer;
var mysql = require('mysql');
var dbconnection = require('./app/dbConnection');


//-----DATABASE-----//

var middleMan = new dbconnection.dbConnection(mysql, 'localhost', 'root','', 'smtp_emails');


//-----SMTP-SERVER-----//
var server = new SMTPServer({
 
 	secure: false,
 	authOptional: true,
 	allowInsecureAuth: true,
 	logger: true, 

 	onRcptTo: function(address, session, callback){
        if(address.address !== 'test@test.com'){
            return callback(new Error('Only test@test.com is allowed to receive mail'));
        }
        return callback(); 
    },

    onData(stream, session, callback){

		stream.pipe(process.stdout); // print message to console
		
		var message = '';
		stream.on('data',function(chunk){
			message += chunk.toString(); //save message
		});

        stream.on('end', function(){
			middleMan.insertRow(session["id"],session["envelope"]["mailFrom"]["address"],session["envelope"]["rcptTo"][0]["address"], message); //store message in database
			//middleMan.getMail();
		});
		return callback();	
    },
});

server.listen(1025,function(){
    console.log("SMTP Server: Started");
});


server.on('error', function(err){
    console.log('Error %s', "Server failed to load on port: 1025");
});


