import { App } from "./app.js";
import dotenv from "dotenv";
import config from "../package.json" assert { type: "json" };

dotenv.config();

const port = process.env.PORT || 9000;

const app = new App({
  port: port,
  name: config.name,
  version: config.version,
});

await app.buildServices();
await app.buildRepos();
await app.startHttpServer();
