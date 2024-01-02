# Notes App using Express and MongoDB

## Overview

This is a simple Notes App built with Express.js and MongoDB, allowing users to perform CRUD (Create, Read, Update, Delete) operations on notes. The backend server is implemented in `server.js`, and the API endpoints are defined in `API.js`. MongoDB is used as the database to store and retrieve notes.

## Features

- **Create**: Add new notes with a title and content.
- **Read**: Retrieve a list of all notes or a specific note by ID.
- **Update**: Modify the content or title of an existing note.
- **Delete**: Remove a note based on its ID.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

API.js -> A REST Api which uses MongoDB as a database and performs CRUD operation on the database when asked by the server.
Server.js -> The server of the application which is reponsible for rendering pages on demand and asking API server to do operations on it's database according to the situation.
API documentation has all the endpoints of API.js , API.js endpoints requires basic authentication for which USERNAME : Hardiknotes and PASSWORD: SkillStreet.

Screenshot of the website: ![image](https://github.com/hardik4555/Notes-app-using-MongoDB/assets/95064351/14aac7a1-77b4-49f1-937b-43e11534f634)


