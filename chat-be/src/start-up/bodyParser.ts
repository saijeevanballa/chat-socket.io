import * as bodyParser from "body-parser";

export = (app: any) => {
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json());
}