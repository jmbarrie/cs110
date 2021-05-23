# Assignment4 Concentrator
Written by Juan Barrientos and Elise Lin. 

## Project Description
<!-- you can include known bugs, design decisions, external references used... -->
### How to Run Code
Please have the following pre-installed. 
1. npm install config
2. npm install nodemon
To run the code, please type:
1. npm start

## Ethics Questions

### Question 1

> Give two possible chatroom moderation features and the reasons that you should implement each one
<!-- Put your answer to question 1 here -->
1. Ban user feature. If a user acts delinquently, a moderator should be able to ban a username for a certain period of time. 
To implement this, each user should have a boolean ban value in a new models/User.js. If the ban value is true, room.js must ensure this user cannot post messages. 

2. Delete a chatroom. If multiple users discuss an inappropriate topic, moderators should be able to delete a whole chatroom. To implement this, we can delete documents that have match the chatroom_name the moderator wants to remove, using room.js. Once deleted, we need to ensure home.hbs is updated with a current chatroom list.
