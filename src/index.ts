import "reflect-metadata";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import routes from "./routes";
import { Connection, createConnection } from "typeorm";

const app = express();

createConnection()
.then(Connection => {
    app.use(bodyParser.json());
    app.use(cors());
    app.use(routes);

    app.listen(3033);
});