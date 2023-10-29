// const jsonServer = require("json-server");
// const server = jsonServer.create();
// const router = jsonServer.router("db.json");

// const middlewares = jsonServer.defaults();

// var fs = require('fs')

// server.use(middlewares);
// server.use(router);

// const port = process.env.PORT || 8088;

// server.listen(port, () => {
//   console.log(`JSON Server is running on port ${port}`);
// });

// use HTTP server
const http = require('http')

const server = http.createServer((req, res) => {
  console.log(req.url, req.method)

  res.setHeader('Content-Type', 'text/html')

})

server.listen(3000, 'localhost', () => {
  console.log('listening on localhost:3000');
})