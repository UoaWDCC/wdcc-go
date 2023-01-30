import express from "express";
import cors from "cors";
import { GSheetsService } from "./services/gsheets.service.js";
import dotenv from "dotenv";
import { GoRepository } from "./repos/links.repo.js";

import gsheetsCredentials from "../private_keys/wdcc-website-prod-4c18b3b7b6f6.json" assert { type: "json" };

dotenv.config();

class App {
  services = {};
  repos = {};

  log(message) {
    console.log(`[${this.name}@${this.version}]`, message);
  }

  constructor({ port, name, version }) {
    this.port = port;
    this.name = name;
    this.version = version;

    this.app = express();

    // This allows our server to return and accept JSON data.
    this.app.use(express.json());

    // This allows this server to be available for cross origin requests.
    this.app.use(cors());

    this.app.get("/", (req, res, next) => {
      res.json({
        name: this.name,
        version: this.version,
      });
    });

    this.app.use(
      "/api/go",
      async (req, res, next) => {
        console.log("Starting request");
        const results = await Promise.all([
          this.repos[GoRepository.name].getLinks(),
          this.repos[GoRepository.name].getRedirects(),
        ]);

        const resp = {
          links: results[0],
          redirects: results[1],
        };

        res.setHeader("Cache-Control", "max-age=300");
        res.json(resp);
        next();
      },
      (req, res, next) => {
        console.log("Ending request");
      }
    );
  }

  async startHttpServer() {
    this.app.listen(this.port, async () => {
      this.log(`Starting server version ${this.version}, on port ${this.port}`);
    });
  }

  async buildServices() {
    this.log(`Building services`);

    const sheetsService = new GSheetsService(
      process.env.GSHEETS_ID,
      gsheetsCredentials
    );
    await sheetsService.init();

    this.services[sheetsService.constructor.name] = sheetsService;
  }

  async buildRepos() {
    this.log(`Building repos`);

    this.repos[GoRepository.name] = new GoRepository(
      this.services[GSheetsService.name]
    );
  }
}

export { App };
