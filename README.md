# SMTPMailApp
Created in response to https://github.com/sendwithus/challenges/blob/master/eng/stmp-rest-api.md.

# How to Use

## Create a database

1. Clone the repo
2. Make sure you have mySQL (https://dev.mysql.com/downloads/)
3. Open terminal/command line and start the SQL server `mysqld`
4. Change your current directory to `<yourLocalProject>/dbGenerator`
5. Connect to the database `mysql -u root -p[password]`
6. In mysql run the following command to generate the database for this app `source smtp_email_gen.sql`

## Start the smtp server

1. In the root directory of the project, edit the file smtp-server.js
2. In the section DATABASE, change the fourth parameter in the function call to your mysql password  `var middleMan = new dbconnection.dbConnection(mysql, 'localhost', 'root','<insert your password here>', 'smtp_emails');`
2. Open a new terminal/command line session, change your current directory to your local project root directory 
3. Run `node smtp-server.js`

## Send mail to your smtp server

1. Open a new terminal/command line session
2. run `telnet localhost 1025`
3. Greet the mail server `HELO localhost`
4. Specify sender `MAIL FROM: <example@test.com>`
5. Specify receipiant `RCPT TO: <test@test.com>` NOTE: the server only accepts messages sent to this email address
6. Create message `DATA`
7. Type message, end my typing `.`
8. Repeat as many times as you wish, all messages will be stored

## Start App
 
 1. In the root directory of the project, edit the file server.js
 2. In the section DATABASE, change the fourth parameter in the function call to your mysql password  `var middleMan = new dbconnection.dbConnection(mysql, 'localhost', 'root','<insert your password here>', 'smtp_emails');`
 3. Open a new terminal/command line session, change your current directory to your local project root directory 
 4. Run `node server.js` 
 5. In a web browser navigate to `http://localhost:8080/ `
 6. Browse through all of the emails you just sent to yourself. So popular. 
