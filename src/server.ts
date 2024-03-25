import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response, urlencoded } from "express";
import path from "path";

import routes from "./routes/routes";

dotenv.config();
const server = express();

server.use(cors());

server.use(express.static(path.join(__dirname, "../public")));

server.use(urlencoded({ extended: true }));

server.use(routes);

server.use((req: Request, res: Response) => {
    res.status(404).json({ error: "Endpoint não encontrado." });
});

server.listen(process.env.PORT);
