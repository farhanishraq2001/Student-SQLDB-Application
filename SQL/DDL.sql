CREATE TABLE IF NOT EXISTS students (
	student_id 	SERIAL,
	first_name 	VARCHAR(255) 	NOT NULL,
	last_name 	VARCHAR(255) 	NOT NULL,
	email 		VARCHAR(255)    NOT NULL UNIQUE,
	enrollment_date 	DATE 			DEFAULT CURRENT_DATE,
	PRIMARY KEY (student_id)
);