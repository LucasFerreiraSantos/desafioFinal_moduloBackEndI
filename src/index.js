//Importando a biblioteca EXPRESS
import express from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { validateUser } from "./validateUser";

const app = express();

//ARRAY DE USUÁRIOS
const users = [];
const messages = [];

//Convertendo o EXPRESS em formato JSON
app.use(express.json());

//CRIAR O USUÁRIO
app.post("/signup", validateUser, async (req, res) => {
  const { name, email, password } = req.body;

  const checkEmail = users.find((user) => user.email === email);

  if (checkEmail) {
    return res.status(400).json({
      message: "E-mail já foi cadastrado!",
    });
  }

  //Biblioteca para encriptar a senha do usuário
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password: hashedPassword,
  };

  users.push(newUser);

  res.status(201).json({
    message: "Usuário criado com sucesso.",
    user: newUser,
  });
});

//LOGIN do usuário
app.post("/enter", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    return res.status(400).json({
      message: "Credenciais inválidas!",
    });
  }

  if (!user) {
    return res.status(404).json({
      message: "Usuário não encontrado!",
    });
  }

  res.json({
    message: "Login bem-sucedido",
    token: user.id,
  });
});

//Criar um recado
app.post("/messages", (req, res) => {
  const { title, description, userId } = req.body;

  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({
      message: "Usuário não encontrado!",
    });
  }

  const newMessage = {
    id: uuidv4(),
    title,
    description,
    userId,
  };

  messages.push(newMessage);

  res.status(201).json({
    message: "Recado criado com sucesso.",
    newMessage,
  });
});

//LISTAR recados
app.get("/messages/:userId", (req, res) => {
  const { userId } = req.params;

  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({
      message: "Usuário não encontrado!",
    });
  }

  const usersMessages = messages.filter((message) => message.userId === userId);

  res.json(usersMessages);
});

//ATUALIZAR um recado
app.put("/messages/:messageId", (req, res) => {
  const { messageId } = req.params;
  const { title, description } = req.body;

  const messageIndex = messages.findIndex(
    (message) => message.id === messageId
  );
  if (messageIndex === -1) {
    return res.status(404).json({
      message: "Recado não encontrado!",
    });
  }

  messages[messageIndex].title = title;
  messages[messageIndex].description = description;

  res.json({
    message: "Recado alterado com sucesso!",
  });
});

//DELETAR recado
app.delete("/messages/:messageId", (req, res) => {
  const { messageId } = req.params;

  const messageIndex = messages.findIndex(
    (message) => message.id === messageId
  );
  if (messageIndex === -1) {
    return res.status(404).json({
      message: "Recado não encontrado!",
    });
  }

  const deletedMessage = messages.splice(messageIndex, 1);

  res.json({
    message: "Recado deletado!",
    deletedMessage,
  });
});

//Rodando o servidor!
const port = 3333;
app.listen(port, () => console.log("Servidor rodando na porta 3333!"));
