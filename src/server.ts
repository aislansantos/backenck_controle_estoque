import "dotenv/config";
import * as cors from "cors";
import * as express from "express";
import { Request, Response, urlencoded } from "express";
// import { Auth } from "@/middleware/Auth.Middleware";
// import * as LogMiddleware from "@/middleware/Log.Middleware";
import loginRouter from "@/routes/login.routes";
import routes from "./routes/user.routes";
import admRoutes from "@/routes/admin.routes";
import { requestIntercepter } from "@/middleware/RequestIntercepter.Middleware";

const app = express();

app.use(cors());
// Middleware para processar JSON e URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(urlencoded({ extended: true }));

// app.use("*", LogMiddleware); // registra movimentos

app.use("*", requestIntercepter);
app.use("/login", loginRouter);

// app.use("*", Auth.private); // valida usuário
app.use("/admin", admRoutes);
app.use("/", routes);

app.use((req: Request, res: Response) => {
    res.status(404).json({ error: "Endpoint não encontrado." });
});

app.listen(process.env.PORT, () => {
    console.log(`🚀 Running in port: ${process.env.PORT}`);
});
