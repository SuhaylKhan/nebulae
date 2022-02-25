# Nebulae

[Nebulae](https://nebulae-app.herokuapp.com/) is a live messaging application inspired by Discord where users can invite friends to Solar Systems they have created and message each other from within Planets.

Users can:
- Create an account or use the demo login
- Log in and out using an account they have created
- Create and join Solar Systems
- Edit and delete Solar Systems they have created
- Create Planets within Solar Systems
- Edit and delete Planets they have created
- Live chat with other users within the same Planet of a Solar System they have created or joined

# Technologies used

- JavaScript
- ReactJS
- NodeJS
- HTML5
- CSS3
- Python
- Flask
- SQLAlchemy

# Installation

1. Clone Nebulae from https://github.com/SuhaylKhan/nebulae.git

## Backend

1. From the root directory install backend dependencies 

   ```
   pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
   ```
   
2. Create a psql user with a `PASSWORD` and `CREATEDB` priviledges

3. Create a psql database with the created user as `OWNER`

4. Create a `.env` file using `.env.example` as a template

5. Migrate and seed your database from within Python's virtual environment

   ```
   pipenv shell
   ```
   ```
   flask db migrate
   ```
   ```
   flask db upgrade
   ```
   ```
   flask seed all
   ```
   
6. Start the backend server from within Python's virtual environment

   ```
   flask run
   ```
   
## Frontend

1. From `react-app` directory install frontend dependencies

   ```
   npm install
   ```
   
2. Start the front end server from `react-app` directory

   ```
   npm start
   ```
   
   - Nebulae should automatically open in a new tab using Google Chrome. If not, navigate to localhost:3000

# Feature List

![overview](/wiki-images/nebulae-overview.png)

# User Authorization / Authentication

- Users can create accounts
- Users can log in with the credentials they used during account creation
- Logged in users can access Solar Systems they have created or joined

![login](/wiki-images/nebulae-log-in.png)

![signup](/wiki-images/nebulae-sign-up.png)

# Solar Systems (servers)

- Users can create Solar Systems and edit / delete existing Solar Systems that they have created
- Users join Solar Systems that they have been invited to

![create server](/wiki-images/nebulae-create-server.png)

![join server](/wiki-images/nebulae-join-server.png)

![edit server](/wiki-images/nebulae-edit-server.png)

# Planets (channels)

- Users can create Planets within Solar Systems and edit / delete existing Planets within Solar Systems that they have joined
- Users can live chat with other users within channels

# Live Chat

- Users can post live messages within Planets of Solar Systems that they have created / joined
- Users can edit / delete messages that they have posted
