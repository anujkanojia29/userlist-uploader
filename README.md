# ASSIGNMET API

> Backend API for User Activation Management

## Usage

Add valid MONGO_URI in "config/config.env"

## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode
npm run dev

# Run in prod mode
npm start
```

## API

Login 
```
/api/v1/auth/login

// body { username, password }

// Response : JWT Token (when succeeded)
// Response Cookie: JWT token
```
Logout
```
/api/v1/auth/logout

// Response Cookie: {}
```

User Management 

Once logged in either use JWT token with request cookie or send it as Bearer token in authorization header 


To get the details of the logged in user

```
/api/v1/user/details

// Response : User Details (without password)
```

To upload list users along with their details
```
/api/v1/user/uploadUsers

// Body: Array of user objects

// Response: Download link of the data containing status of users uploaded
```

To list down all the downlinks of the uploads made by logged in user
```
/api/v1/user/uploads

// Response: List of Download links
```

To download data containing status of users uploaded
```
/api/v1/user/download/:id

// Response: data.json
```

## Docker

To build docker image 
```
docker build -t assignment-image .
```

To run docker build

```
docker run --publish 8000:5000 --detach --name bb assignment-image:latest
```

## Demo

Without Docker
http://localhost:5000

With Docker 
http://localhost:8000