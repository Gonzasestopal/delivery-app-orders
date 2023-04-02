# Taco Feliz Orders API

- Exposes Orders API for our Delivery application.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Prerequisites

  - Make sure you have https://github.com/Gonzasestopal/delivery-app-db-layer running.

## Installation

- Run `npm install` to install dependencies.

## Usage
- Run `npm run server` to start the local development server.

## Migrations

- Run `knex migrate:rollback` to reset any previous changes.
- Run `knex migrate:latest` to setup the migration file.
- Run `knex seed:run` to populate the sample seed data.

# API Documentation

## GET  /api/meals

Returns an array of item objects:
```json
[
  {
    "id": 1,
    "name": "Pizza",
    "notes": "Rica",
    "category": "Italiana",
    "price": 990,
    "image": "https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png",
    "is_available": true,
    "created_at": null,
    "updated_at": null
  },
  {
    "id": 2,
    "name": "Burger",
    "notes": "Jugosa",
    "category": "Americana",
    "image": "https://expressjs.com/images/express-facebook-share.png",
    "price": 490,
    "is_available": true,
    "created_at": null,
    "updated_at": null
  }
]
```

## POST  /api/meals

Receives a request body:
```json
{
  "name": "sample name",
  "notes": "sample description",
  "price": 390,
  "is_available": true,
  "category": "cat1",
  "image": "imageURL"
}
```

Returns the created item object:
```json
{
  "message": "Successfully added the item.",
  "item": {
    "id": 1,
    "name": "sample name",
    "notes": "sample description",
    "category": "cat1",
    "price": 390,
    "is_available": true,
    "image": "imageURL",
    "created_at": null,
    "updated_at": null
  }
}
```

## PUT  /api/meals/:id

Receives an existing request parameter ID and a request body:
```json
{
  "name": "sample name UPDATE",
  "notes": "sample description UPDATE",
  "category": "cat1 UPDATE",
  "image": "imageURL UPDATE",
  "price": "price UPDATE",
  "is_available": "is_available update"
}
```

Returns the updated item object:
```json
{
  "id": 1,
  "name": "sample name UPDATE",
  "description": "sample description UPDATE",
  "category": "cat1 UPDATE",
  "image": "imageURL UPDATE",
  "price": "price UPDATE",
  "is_available": "is_available update",
  "created_at": null,
  "updated_at": null
}
```

## POST  /api/meal_options/

Receives a request body:
```json
{
  "meal_id": "1",
  "name": "mas salsa",
  "price": 100,
  "is_available": true,
}
```

Returns the created item object:
```json
{
  "message": "Successfully added the item.",
  "item": {
    "id": 1,
    "name": "mas salsa",
    "meal_id": "1",
    "price": 100,
    "is_available": true,
    "created_at": null,
    "updated_at": null
  }
}
```

## PUT  /api/meal_options/:id

Receives an existing request parameter ID and a request body:
```json
{
  "name": "sample name UPDATE",
  "price": "price UPDATE",
  "is_available": "is_available update"
}
```

Returns the updated item object:
```json
{
  "id": 1,
  "name": "sample name UPDATE",
  "price": "price UPDATE",
  "is_available": "is_available update",
  "created_at": null,
  "updated_at": null
}
```

## DELETE  /api/meal_options/:id

Receives an existing request parameter

Returns a success message:
```json
{
  "message": "Successfully removed the item."
}
```
