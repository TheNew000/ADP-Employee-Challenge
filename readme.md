#ADP Coding Challenge!

![Screen Shot](../master/css/img/screen_shot.png "An exact replica!")

###Try it yourself!

cd into the directory:

`cd ADP-Employee-Challenge`

Run this command to install all dependencies:

`npm install`

Run this command to start the application on localhost:8000:

`node server`

Next to start Mongo run:

`mongod`

To upload some dummy data to play with run these 3 commands:

`mongoimport --db ADP --collection employees --drop --file api/assets/employee-dataset.json`

`mongoimport --db ADP --collection company --drop --file api/assets/company-dataset.json`

`mongoimport --db ADP --collection managers --drop --file api/assets/manager-dataset.json`

In a new tab cd into ADP-Employee-Challenge/api and run:

`nodemon`

In your browser window navigate to localhost:8000. Have fun!

Login: thenew000

Password: hambone

## To add next:

Log Out Capability

An exit without saving for edit screen

Handlebars to display the messages the client receives from the server (i.e. "Employee Successfully Added!"  or "User not found/password incorrect", etc)

Bcrypt and get rid of the awful password check

passport for better security/stay logged in
