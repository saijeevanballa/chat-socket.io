import Express from "express";

const app = Express()

require("./startup/db")();
require("./start-up/bodyParser")(app)


app.get("/", (req, res)=>{
    res.status(200).send("hello world");
})

export = app;
