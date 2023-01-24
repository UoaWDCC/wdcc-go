import { Server } from "./server.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 9000;

const server = new Server({
  port: port,
  name: "wdcc-go-service",
  version: "0.1.0"
})

server.start();