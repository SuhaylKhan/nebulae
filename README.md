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

## User Authorization / Authentication

- Users can create accounts
- Users can log in with the credentials they used during account creation
- Logged in users can access Solar Systems they have created or joined

![login](/wiki-images/nebulae-log-in.png)

![signup](/wiki-images/nebulae-sign-up.png)

## Solar Systems (servers)

- Users can create Solar Systems and edit / delete existing Solar Systems that they have created
- Users join Solar Systems that they have been invited to

![create server](/wiki-images/nebulae-create-server.png)

![join server](/wiki-images/nebulae-join-server.png)

![edit server](/wiki-images/nebulae-edit-server.png)

## Planets (channels)

- Users can create Planets within Solar Systems and edit / delete existing Planets within Solar Systems that they have joined
- Users can live chat with other users within channels

![create channel](/wiki-images/nebulae-create-channel.png)

![edit channel](/wiki-images/nebulae-edit-channel.png)

## Live Chat

- Users can post live messages within Planets of Solar Systems that they have created / joined
- Users can edit / delete messages that they have posted

## Future Features

### Direct Messaging

- Users can send private messages directly to other users of Solar Systems both users are a part of
- Users can edit / delete private messages that they have sent

# Database Schema

![database schema](/wiki-images/nebulae-db-schema.png)

## users

| Column Name     | Datatype     | Constraints      |
|-----------------|--------------|------------------|
| id              | INTEGER      | PK, NOT NULL     |
| first_name      | VARCHAR(50)  | NOT NULL         |
| last_name       | VARCHAR(50)  | NOT NULL         |
| username        | VARCHAR(25)  | NOT NULL, UNIQUE |
| email           | VARCHAR(255) | NOT NULL, UNIQUE |
| hashed_password | VARCHAR(255) | NOT NULL         |
| created_at      | TIMESTAMP    | NOT NULL         |
| updated_at      | TIMESTAMP    | NOT NULL         |

## servers

| Column Name | Datatype    | Constraints      |
|-------------|-------------|------------------|
| id          | INTEGER     | PK, NOT NULL     |
| admin_id    | INTEGER     | NOT NULL, FK     |
| name        | VARCHAR(50) | NOT NULL         |
| created_at  | TIMESTAMP   | NOT NULL         |
| updated_at  | TIMESTAMP   | NOT NULL         |

- `admin_id` references `users.id`

### users_servers (association table)

| Column Name | Datatype  | Constraints  |
|-------------|-----------|--------------|
| user_id     | INTEGER   | NOT NULL, FK |
| server_id   | INTEGER   | NOT NULL, FK |

- association table used to facilitate many-to-many relationship between `users` and `servers`
- `user_id` references `users.id`
- `server_id` references `servers.id`

## channels

| Column Name | Datatype      | Constraints  |
|-------------|---------------|--------------|
| id          | INTEGER       | PK, NOT NULL |
| server_id   | INTEGER       | NOT NULL, FK |
| name        | VARCHAR(50)   | NOT NULL     |
| description | VARCHAR(2000) |              |
| created_at  | TIMESTAMP     | NOT NULL     |
| updated_at  | TIMESTAMP     | NOT NULL     |

- `server_id` references `servers.id`

## channel_messages

| Column Name | Datatype      | Constraints  |
|-------------|---------------|--------------|
| id          | INTEGER       | PK, NOT NULL |
| user_id     | INTEGER       | NOT NULL, FK |
| channel_id  | INTEGER       | NOT NULL, FK |
| content     | VARCHAR(2000) | NOT NULL     |
| created_at  | TIMESTAMP     | NOT NULL     |
| updated_at  | TIMESTAMP     | NOT NULL     |

- `user_id` references `users.id`
- `channel_id` references `channels.id`

## direct_channels

| Column Name | Datatype      | Constraints  |
|-------------|---------------|--------------|
| id          | INTEGER       | PK, NOT NULL |
| created_at  | TIMESTAMP     | NOT NULL     |
| updated_at  | TIMESTAMP     | NOT NULL     |

### users_direct_channels (association table)

| Column Name       | Datatype  | Constraints  |
|-------------------|-----------|--------------|
| user_id           | INTEGER   | NOT NULL, FK |
| direct_channel_id | INTEGER   | NOT NULL, FK |

- association table used to facilitate many-to-many relationship between `users` and `direct_channels`
- `user_id` references `users.id`
- `direct_channel_id` references `direct_channels.id`

## direct_messages

| Column Name       | Datatype      | Constraints  |
|-------------------|---------------|--------------|
| id                | INTEGER       | PK, NOT NULL |
| user_id           | INTEGER       | NOT NULL, FK |
| direct_channel_id | INTEGER       | NOT NULL, FK |
| content           | VARCHAR(2000) | NOT NULL     |
| created_at        | TIMESTAMP     | NOT NULL     |
| updated_at        | TIMESTAMP     | NOT NULL     |

- `user_id` references `users.id`
- `direct_channel_id` references `direct_channels.id`

# Frontend Routes

## Splash / User Auth

- `/`
- `/login`
- `/sign-up`

## Solar Systems / Channels / Chat

- `/servers`
- `/servers/:server_id/channels`
- `/servers/:server_id/channels/:channel_id`

# Backend Routes

## Auth

All auth routes begin with `/api/auth`

- GET `/`
- GET `/logout`
- GET `/unauthorized`
- POST `/login'
- POST `/signup`

## Channel

All channel routes begin with `/api/channels`

- GET `/:channel_id/messages`
- POST `/new`
- PUT `/:channel_id/edit`
- DELETE `/:channel_id/delete`

## Message

All message routes begin with `/api/messages`

- POST `/new`
- PUT `/:message_id/edit`
- DELETE `/:message_id/delete`

## Server

All server routes begin with `/api/servers`

- GET `/:server_id/channels`
- POST `/new`
- POST `/:server_id/join`
- POST `/:server_id/leave`
- PUT `/:server_id/edit`
- DELETE `/:server_id/delete`

## User

All user routes begin with `/api/users`

- GET `/`
- GET `/:user_id`
- GET `/:user_id/servers`
