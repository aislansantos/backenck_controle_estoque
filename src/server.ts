import dotenv from "dotenv";
import express from "express";

import routes from "./routes/routes";

dotenv.config();
const server = express();

server.use(routes);

server.listen(process.env.PORT);
