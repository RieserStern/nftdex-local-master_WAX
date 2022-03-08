import express from "express";
import compression from "compression"; // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import flash from "express-flash";
import path from "path";
import cors from "cors";

const dotenv = require("dotenv");
dotenv.config();
import router from "./routes/index";

global.fetch = require("node-fetch");
global.WebSocket = require("ws");
import { SCListener } from "./services/SCListener";

export default () => {
  let app = express();
  // Express configuration
  app.set("port", process.env.PORT || 3000);
  app.set("views", path.join(__dirname, "../views"));
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(flash());
  app.use(cors());
  app.use(lusca.xframe("SAMEORIGIN"));
  app.use(lusca.xssProtection(true));

  app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
  );

  router(app);

  return app;
};
