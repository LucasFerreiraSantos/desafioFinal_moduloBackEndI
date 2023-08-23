//Importando a biblioteca EXPRESS
import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();

//Convertendo o EXPRESS em formato JSON
app.use(express.json());

//ARRAY DE USUÁRIOS
const users = [];

//CRIAR O USUÁRIO
app.post("/signUp", (req, res) => {
  const { name, email, password } = req.body;

  const checkEmail = users.find(user => user.email === email)

  if(checkEmail){
    return res.status(400).json({
      message: "E-mail já foi cadastrado!"
    })
  }

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  users.push(newUser);

  res.status(201).json({
    message: "Usuário criado com sucesso.", user: newUser
  })
});

//Rodando o servidor!
const port = 3333;
app.listen(port, () => console.log("Servidor rodando na porta 3333"));
