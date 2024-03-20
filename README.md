Required softwares: _For all the software bellow go through the setup process with default/preselected settings_
  PostgreSQL/pgAdmin4: https://www.postgresql.org/download/
  node.js : https://nodejs.org/en
  Git     : https://git-scm.com/downloads 

Folders:  
  Application: Contains the files for the CRUD web application utilizing REST API to query the PostgreSQL DB
  SQL        : Contains the DDL and DML files to setup the student table

Run instructions:
  1) Have a students table created in the SQL DB using the DDL file and populate it using the DML file
  2) In your desired folder, open git bash and run the following command:
        git clone https://github.com/farhanishraq2001/Student-SQLDB-Application.git
  3) Inside the Application folder change the following in the dev.env file and hit save
        DATABASE=<Your database>
        PASSWORD=<Password to your database>
        PORT=<Port your PostgreSQL databse is running on. default is 5432>
  5) While having pgAdmin4 open, go to the Application folder (can open it in VSCode integrated terminal), type
     node server.js in the terminal and hit enter on your keyboard
  6) Now the server should be running at localhose:3000/students
     You can now interact with the server to view, add, update, and delete student(s)

