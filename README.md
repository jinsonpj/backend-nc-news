# Jinson's News Server

A RESTful API built with Node.js, Express, and PostgreSQL that serves data for a news application. The API allows users to retrieve articles, topics, users, and comments, as well as interact with the content through voting and commenting.

This project was developed as part of the Northcoders Software Development Bootcamp to demonstrate backend development skills including database design, API creation, testing, and error handling.

**Tech Stack**
Node.js
Express
PostgreSQL
Jest
Supertest
dotenv
pg

**Features**
Retrieve articles, topics, users, and comments
Filter and sort articles
Vote on articles
Post and delete comments
Structured error handling
Fully tested endpoints

**API Endpoints**
Method	Endpoint	Description
GET	/api	API description
GET	/api/topics	Get all topics
GET	/api/articles	Get all articles
GET	/api/articles/:article_id	Get article by ID
GET	/api/articles/:article_id/comments	Get comments for an article
POST	/api/articles/:article_id/comments	Add a comment
PATCH	/api/articles/:article_id	Update article votes
DELETE	/api/comments/:comment_id	Delete a comment

**Installation**

Clone the repository:

git clone https://github.com/jinsonpj/backend-nc-news.git

cd nc-news-server

Install dependencies:

npm install

Create the required environment variables:

.env.development
.env.test

Example:

PGDATABASE=nc_news
Set Up the Database

Create and seed the database:

npm run setup-dbs
npm run seed
Running Tests

Run the test suite with:

npm test

**Minimum Requirements**
Node.js v18+
PostgreSQL v12+

**Related Frontend**
The frontend application that consumes this API can be found here: https://github.com/jinsonpj/nc-news

**Author**
Jinson
