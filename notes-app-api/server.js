const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");

const middlewares = jsonServer.defaults();

var fs = require('fs')

server.use(middlewares);
server.use(router);

const port = process.env.PORT || 8088;

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
