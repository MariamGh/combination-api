# Combination Generator API

## Overview
This project is a Node.js API that generates valid combinations from a list of item counts and stores the results in a MySQL database. The key rule is that items starting with the same prefix letter cannot be combined together in the same combination.

The API receives an input array representing counts of item types and a required combination length, generates all valid combinations based on the rule, saves the data in the database using transactions, and returns the stored results with unique IDs.

## Features
- Generate all valid combinations of items without prefix collisions.
- Store items, combinations, and API responses in MySQL.
- Use raw SQL queries with `mysql2` package — no ORM.
- Ensure data consistency with MySQL transactions.
- RESTful API with a clean and modular structure.
- Input validation and error handling.

## Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- MySQL Server
- npm (comes with Node.js)

## Installation and Usage
```
git clone https://github.com/MariamGh/combination-api.git
cd combination-api
npm install
cp .env.example .env
Edit the .env file if needed, for example to change the port or database credentials
npm run dev
The server will start, usually at http://localhost:3000
You can test the API endpoints using tools like Postman or curl, for example:
curl http://localhost:3000/api/combinations
```
