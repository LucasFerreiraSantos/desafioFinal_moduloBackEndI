const express = require("express");

const app = express();
const port = 3333;

app.use(express.json());

const users = [];

app.get("/", (req, res) => ({}));

app.post("/users", (req, res) => {
  co;
});

app.put("users/:id", (req, res) => {
  const { id } = req.params;
  const { name: updatedName } = req.body;

  const user = users.find((user) => user.id === Number(id));

  user.name = updatedName;

  if (!user) {
    return res.status(404).json({
      message: "Usuário não encontrado!",
    });
  }
});

app.listen(port, () => console.log("Servidor rodando na porta 8080"));
