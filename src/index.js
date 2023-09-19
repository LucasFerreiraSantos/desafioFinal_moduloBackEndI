//Importando a biblioteca EXPRESS
import express from "express";
import users from "./routes/user";
import scrap from "./routes/scrap";
const cors = require("cors");

const app = express();

//Convertendo o EXPRESS em formato JSON
app.use(express.json());
app.use(cors());

app.use("/users", users);
app.use("/scrap", scrap);

//Rodando o servidor!
const port = 3333;
app.listen(port, () => console.log("Servidor rodando na porta 3333!"));
