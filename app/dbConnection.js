"use strict"
class dbConnection{

	constructor(mysql, host, user, password, database){
		this.db = mysql.createConnection({
		  host     : host,
		  user     : user,
		  password : password,
		  database : database
		});
		
		this.emails = [];
	}

	insertRow(id_num, from, to, mes){
		this.db.query('INSERT INTO envelope SET ?', {id: id_num, mail_from: from, mail_to: to, message_data: mes}, function(err, res) {
			if(err) 
				throw err;
			console.log('Last insert ID:', res.insertId);
		});
	}

	getMail(res){
		var self = this;
		this.db.query("USE smtp_emails"+";");
		this.db.query('SELECT * FROM envelope;', function(err, rows, fields) {
			if (!err){
				self.emails = [];
				for (var i in rows) {
					var envelope = {"id": rows[i]["id"], "from": rows[i]["mail_from"], "to": rows[i]["mail_to"], "message": rows[i]["message_data"]};
					self.emails.push(envelope);
    			}  
    			//console.log(self.emails);
    			res.json(self.emails);
		  	}
		  else{
			console.log('Error while performing getting mail.');
			throw err;
		  }
		});
	}


	getData(res){
		res.json({tables: this.tables, links: this.links})
	}
}

module.exports = {
	dbConnection : dbConnection
};