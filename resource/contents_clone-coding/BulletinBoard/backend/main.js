// import {router} from "./src/router/router.js";
import http from "http";
import { router } from "./src/router/index.js"

const hostname = '127.0.0.6';
const port = 80;

// const server = http.createServer(router);
const server = http.createServer(router);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});