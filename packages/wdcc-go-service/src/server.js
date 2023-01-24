import express from "express";
import cors from "cors";

export class Server {
  constructor({ port, name, version, }) {
    this.port = port;
    this.name = name;
    this.version = version;

    this.app = express();

    // This allows our server to return and accept JSON data.
    this.app.use(express.json());

    // This allows this server to be available for cross origin requests.
    this.app.use(cors());

    this.app.get("/", (req, res, next) => {
      res.send(`Hello, welcome to ${this.name}'s express API.`)
      console.log(req);
    })

    this.app.use(
      "/api", 
      (req, res, next) => {console.log("Starting request", req.path); next()}, 
      (req, res, next) => {console.log("Ending request", req.path)}
    );
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`[${this.name}] Running server version ${this.version}, on port ${this.port}`)
    })
  }
}