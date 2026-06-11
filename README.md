# LinkedIn Clone Backend

A backend API for a LinkedIn Clone application built using Node.js, Express.js, MongoDB, and JWT Authentication.

## Features

* User Signup
* User Login
* JWT Authentication
* Password Hashing with bcryptjs
* Joi Validation
* MongoDB Database Integration
* Cookie-Based Authentication

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Joi
* cookie-parser

## Installation

1. Clone the repository

```bash
git clone https://github.com/siddhantsaigaonkar/linkedin-clone.git
```

2. Navigate to the project folder

```bash
cd linkedin-clone
```

3. Install dependencies

```bash
npm install
```

5. Start the development server

```bash
npm run dev
```

## API Endpoints

### Authentication

#### Signup

```http
POST /api/auth/signup
```

Request Body:

```json
{
  "firstName": "Siddhant",
  "lastName": "Saigaonkar",
  "userName": "siddhant14",
  "email": "siddhant@gmail.com",
  "password": "123456"
}
```



## Author

Siddhant Mahesh Saigaonkar
