# 461-final-project
To run backend app:
Find /hardware_app/backend/main.py
run main.py

May need to change localhost to 127.0.0.1 in CreateAccount.js, CreateProject.js, LoginPage.js, ProjectDashboard.js, ProjectSignIn.js, and ProjectView.js


To run Frontend:
(I suggest cloning the repo rather than downloading the files, it works for me)

cd hardware_app
npm install (ensuring you have all the libraries)
npm start


Project Plan
Team Members:
Erjian Gao
Chenxiao Wang 
Ryan Mercado
Grayson Drinkard
Josie Fleming
Sprint Velocity:
Cycle: 1 week
20 work items per sprint (4 per member)

Collaboration Tools:
Github
Zoom
Discord

Implementation Methodologies: 
Database: 
MongoDB
Back-end:
Python
Flask
Front-end: 
React.js
HTML/CSS/Js
Testing:
Postman
Pycharm Testing Script

Features(User Management):


A sign-in area where users can sign in by providing their user name, userid and password. If the user clicks on New User, display a pop-up that allows them to enter a new userid and password.
Connected to database with list of users and passwords with API
An area where users can create new projects, by providing project name, description, and projectID.
An area where users can choose to login to existing projects.
Connected to database with list of all projects and their info
A database where you can save user information and project information.
Project info must show which users have access, the project is private to these
Need to choose a database
An API to access information stored in the database.
Check if username/password is valid
Create a new user
Security features to encrypt the user id and password.
Implement in-class encryption
Project Features (Resource Management):

Database that has a list of total resources
Stored total capacity
Stored available units
The non-available units must be tied to the project that checked them out
Front end always displays the resources
API that allows for check-in/checkout	
Check-out (x units): Database must have x available units
Check-in (x units): User's project must >= x units checked out
Work Items:

Create Database
Create the structure for Users (username, encrypted password)
Create the structure for Projects (ID, checked-out resources, good to have: owner)
Create the structure for Resources (add lock to handle request at the same time)
Inventory and Capacity (Inventory = Capacity-(sum of all checked out)) 
Testing (ensure each structure can fulfill its requirements)
Create and Implement API 
Connect API to Database
Design API architecture 
Return the validation of login
Create new user based on the information passed and encrypt the userID and password, and store them in the database
Create a new project based on info passed and store id/ create new database sections for each hardware item and store userID
Validate project login, return error or return next point’s data
Return the inventory of all resources of specific project
Modify the stock of the resources when receiving the check-in and check-out request. And pass the modification to the project and resource storage
Testing
Call API from repo 
Host bare-bones website
Create default user login screen
New Users button that creates create account popup
Submit button for create new user with API call
Create login text-box space to enter username and password
Submit info and pass data to API
If incorrect, clear the text box
If correct, move to next page, displaying logged in user (top corner of page)
Create Project Login Screen
New Project button that creates pop-up to create new project
Have text-boxes for Name of project, description of project, and projectID
Submit button to call API with data
Create text-box for project ID login
Submit and call API to compare against database for correct project ID
If incorrect, clear the text box
If correct, API returns data for next page
Create Resource Management
Create text-boxes for Check in and out requests for each HWSet
Submit buttons that calls API and refreshes page to update page
Display capacity and availability for each HWSet

Potential Features:
password requirements
amount of login attempts
attach project ID to user ID
error message if incorrect password or project ID
error message if project ID doesn’t exist
deleting project (maybe require username and password in pop up)

User Stories:
As an ECE student, I want a way to keep track of the hardware I check out for my projects, so that I can be more organized in my work and know exactly what I have for each project.
As an ECE student doing group work, I want a way to know which hardware my teammates have checked out, so that I do not check out extra materials for my project.


High Level Design:

![High Level Design Should be Here](/imgs/highLevelDesign.png)

User Interface Design:
![Designs Should Be Here](/imgs/webExample.png)



