import * as Express from "express";

const app = Express()

require("./start-up/db")();
require("./start-up/bodyParser")(app)


app.get("/", (req, res) => {
    res.status(200).send("hello world");
})

export = app;
