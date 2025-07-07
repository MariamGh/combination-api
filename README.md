# combination-api
Node.js API for generating unique item combinations with prefix restrictions, storing results in MySQL with transaction support.

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

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MariamGh/combination-api.git
   cd combination-api
