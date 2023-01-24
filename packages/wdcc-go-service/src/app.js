import express from "express";
import cors from "cors";
import { GSheetsService } from "./services/gsheets.service.js";
import dotenv from "dotenv";
import { LinksRepository } from "./repos/links.repo.js";

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
        version: this.version
      });
    });

    this.app.use(
      "/api/links",
      async (req, res, next) => {
        console.log("Starting request");
        const result = await this.repos[LinksRepository.name].getLinks();
        res.setHeader('Cache-Control', 'max-age=3600');
        res.json(result);
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

    const linksRepo = new LinksRepository(this.services[GSheetsService.name]);
    this.repos[linksRepo.constructor.name] = linksRepo;
  }
}

export {
  App
}