# Cat Adoption API
This project is a backend service for Cat Adoption application. It's built using Node.js with Express and utilizes Sequelize ORM to interact with a PostgreSQL database.

## Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v20.x or later)
pnpm (v9.x or later)
PostgreSQL (v16.x or later)

### Getting Started
Follow these instructions to get your project up and running.

### Install dependencies
```
pnpm install
```

### Configure the environment
Create a .env file in the root directory and update it with your database credentials and other environment-specific settings:

```
PORT=

DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=
JWT_REFRESH_SECRET=
```


### Start the server
```
node app.js
```


### Built With
Node.js - The JavaScript runtime
Express - The web framework
Sequelize - ORM for Node.js
PostgreSQL - The relational database
pnpm - Dependency Management

Authors
Richard Tan 

License
This project is licensed under the ISC License - see the LICENSE.md file for details

