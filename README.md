# bruh_app

The application exposes a front end making an user able to:
- Register as a bro;
- Send a message to another bro (obviously the message should be "bruh");
- Show which bro send his other bro a message;

These actions are implemented via back end methods that handle the input data and manage the interaction with the database.

The database of choice for this project is PostgreSQL and it was integrated into Heroku via the Database Provisioning Addon available on Heroku marketplace

For simplicity reasons, the buttons have been implemented as html forms (as the request body is implicitly created with the name specified in the forms) and thus they redirect a user to the response of the server.
The previous can be avoided by actually implementing the buttons as *html* buttons (uber description tho (-_-) ) and implementing their onClick methods via a script.

The application is deployed via heroku and a pipeline has been created in order to integrate the deployment with the Main (ex Master - *sad git noises* ) branch of the project in order to achieve a minimal degree of CI.

The application can be accessed here:
https://afternoon-mountain-35872.herokuapp.com/
**NOTE: The application is a PoC and it doesn not check for input integrity. Bad inputs will crash it.

After registering / sending a bruh / showing bros, click back to come back to the html.

The application is using the hobby programmer plan from Heroku and thus it is free of charge.
