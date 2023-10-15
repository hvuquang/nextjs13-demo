A simple CRUD-API for a Next13 notes-app implemented using JSON-server. 

A live version of the API is hosted [here](https://next13-notes-app-api-production.up.railway.app/).

## Getting started

Install dependencies 

```
npm i
```

Start the server

```bash
npm start
```

Now if you go to [http://localhost:3000/notes](http://localhost:3000/notes) you should get the data for all saved notes.

Also when doing requests, it's good to know that:

- If you make POST, PUT, PATCH or DELETE requests, changes will be automatically and safely saved to `db.json` using [lowdb](https://github.com/typicode/lowdb).
- Your request body JSON should be object enclosed, just like the GET output. (for example `{"name": "Foobar"}`)
- Id values are not mutable. Any `id` value in the body of your PUT or PATCH request will be ignored. Only a value set in a POST request will be respected, but only if not already taken.
- A POST, PUT or PATCH request should include a `Content-Type: application/json` header to use the JSON in the request body. Otherwise it will return a 2XX status code, but without changes being made to the data. 

## Routes

### Available routes

```
GET    /notes
GET    /notes/:id
POST   /notes
PUT    /notes/:id
PATCH  /notes/:id
DELETE /notes/:id
```

### Full-text search

Add `q`

```
GET /notes?q=internet
```
