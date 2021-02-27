import { join } from "path";

// import * as  amcRouter from "../amc/router";

const PREFIX = process.env.PREFIX;

export = (app, express) => {

    app.get(`${PREFIX}/`, (req, res) => {
        res.status(200).send("hello I am chat-server :)")
    })

    // APP ROUTES
    // app.use(`${PREFIX}/user`, userRouter);
    app.use(`${PREFIX}/static`, express.static(join(__dirname, 'uploads')))

    // 404 HANDLER
    app.use((req, res, next) => {
        res.send({ errors: [{ 'code': 404, 'message': 'Undefined endpoint url ' + req.baseUrl }] });
    })

    // ERROR HANDLER
    app.use((error: Error, req: any, res: any, next: any) => {
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.error(`\n API: ${fullUrl},\n Message: ${error.message}\n Trace: ${error.stack}`)
        res.status((error as any).code < 600 ? (error as any).code : 500 || 500).send({ errors: error.message || (error as any).error })
    });
}


