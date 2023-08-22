//Importando a biblioteca EXPRESS
import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
let myuuid = uuidv4();

//Convertendo o EXPRESS em formato JSON
app.use(express.json());

app.get("/", (_, res) => res.json(console.log(`Sei UUID é: ${myuuid}`)));

//Rodando o servidor!
const port = 3333;
app.listen(port, () => console.log("Servidor rodando na porta 3333"));
