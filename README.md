# Realtime Chat App

This is a chat app that updates in realtime similar to something like whatsapp, build with React, SASS and Firebase. All users can read the public chat but mut sign in with google to post messages. You can also delete your messages if you feel the need.

## Features

- User authentication with googles Auth API
- Creating, reading, updating and deleting firebase database entries
- Theme toggle switching from dark to light mode

## What I learned

This was the project that helped me fully understand Promise based asynchronous Javascript, both through the .then() Promise method chaining and the ES6 async await syntax. I learned about collection based NoSQL database structures, authentication, security through firebase seurity rules, Node js with Firebase Cloud functions and manipulating database collections / documents.

Finally I learned about APIs and how important it is to keep your credentials safe with env files after I uploaded my naked API key on github and had to end up regenerating a new one in the google developers console. The keys and sensitive information are now safe behind .env file variables extracted with process.env

The app is deployed [here.](https://realtime-react-chat-app.firebaseapp.com/)
