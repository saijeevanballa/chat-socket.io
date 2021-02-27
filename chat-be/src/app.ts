import * as express from "express";

const app = express()

require("./start-up/db")();
require("./start-up/bodyParser")(app)
require("./start-up/routes")(app, express)

export = app;
