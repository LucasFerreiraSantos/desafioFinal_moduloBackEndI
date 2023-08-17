const express = require("express");

const app = express();

app.get("/", (request, response) =>
  response.status(200).json("Hello, pessoal!")
);

const port = 3333;
app.listen(port, () => console.log("Servidor rodando na porta 8080"));
