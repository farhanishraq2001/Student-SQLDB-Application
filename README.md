Required softwares: _For all the software bellow go through the setup process with default/preselected settings_
  
  PostgreSQL/pgAdmin4: https://www.postgresql.org/download/
  
  node.js : https://nodejs.org/en
  
  Git     : https://git-scm.com/downloads 

  VSCode  : https://code.visualstudio.com/download

Folders:  
  Application: Contains the files for the CRUD web application utilizing REST API to query the PostgreSQL DB
  
  SQL        : Contains the DDL and DML files to setup the student table


Run instructions:
  1) Have a students table created in the SQL DB using the DDL file and populate it using the DML file
  2) In your desired folder, open git bash and run the following command:
        git clone https://github.com/farhanishraq2001/Student-SQLDB-Application.git
  3) Inside the Application folder change the dev.env file appropriately and hit save. The following are perhaps the most important changes:
        DATABASE="Your database"
        PASSWORD="Password to your database"
        PORT="Port your PostgreSQL databse is running on. default is 5432"
  5) While having pgAdmin4 open, open the Student-SQLDB-Application folder in the VSCode, then open the Application folder integrated terminal and then type node server.js and hit enter as shown in the video
     You can do this step using other terminals as well, you just have to make sure to be in the ..\Student-SQLDB-Application\Application directory
  6) Now the server should be running at localhost:3000/students
     You can now interact with the server to view, add, update, and delete student(s) from/to the students table
  7) To end the server, simply head back to the terminal where you typed node server.js. Here hold control + c (for Windows)
     or command + c (for Mac) on your keyboard

Video Demo showcasing the application being run: https://www.youtube.com/watch?v=EUGnOjKTpN0
