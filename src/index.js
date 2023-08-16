const express = require("express");

const app = express();

app.get("/", (request, response) => response.status(200).json("Hello, pessoal!"));
app.listen(8080, () => console.log("Servidor rodando na porta 8080"));
