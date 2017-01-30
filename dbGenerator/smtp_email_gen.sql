-- run using cmd "source smtp_email_gen.sql"

DROP DATABASE IF EXISTS smtp_emails;
CREATE DATABASE smtp_emails;
use smtp_emails;
CREATE TABLE envelope (id VARCHAR(20), mail_from VARCHAR(20), mail_to VARCHAR(20), message_data VARCHAR(20));