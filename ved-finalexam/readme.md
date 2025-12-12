This project is a Restaurant Directory API built using Node.js, Express, and MongoDB.
The API allows users to create, read, and delete restaurant entries in a database. It also includes pagination for efficient data retrieval and Swagger UI documentation for easy testing and reference.

The goal of this project is to demonstrate:

Connecting an Express app to MongoDB

Implementing RESTful CRUD operations

Using environment variables for configuration

Adding pagination to API responses

Documenting an API with Swagger/OpenAPI

⚡ Features

GET /api/restaurants – List all restaurants with pagination (10 items per page)

POST /api/restaurants – Add a new restaurant to the directory

DELETE /api/restaurants/:_id – Remove a restaurant by ID

Swagger UI Documentation – Accessible at /api-docs

🛠 Technologies Used

Node.js – JavaScript runtime

Express.js – Backend web framework

MongoDB – NoSQL database (hosted on Atlas)

Mongoose – ODM for MongoDB

dotenv – Environment variable management

Swagger UI + OpenAPI – API documentation

Morgan – HTTP request logger







The server will start on http://localhost:3000.

📦 API Endpoints
1. Get All Restaurants
GET /api/restaurants


Query Parameters: page (optional, default = 1)

Response:

{
  "page": 1,
  "perPage": 10,
  "totalItems": 0,
  "totalPages": 0,
  "items": []
}

2. Create a New Restaurant
POST /api/restaurants


Body (JSON):

{
  "name": "Pizza Palace",
  "address": "123 Main St",
  "phoneNumber": "123-456-7890",
  "emailAddress": "info@pizza.com",
  "rating": 8
}


Response:

{
  "message": "Restaurant created",
  "restaurant": { ... }
}

3. Delete a Restaurant
DELETE /api/restaurants/:_id


Response:

{
  "message": "Restaurant deleted"
}

📖 Swagger Documentation

Swagger UI is available at:

http://localhost:3000/api-docs


It provides a user-friendly interface to test all API endpoints.



✅ Notes

Pagination defaults to page 1 with 10 items per page

MongoDB connection is required to run the app

API responses are in JSON format

Swagger is integrated for easy endpoint testing