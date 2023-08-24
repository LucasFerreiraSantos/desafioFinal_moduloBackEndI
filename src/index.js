//Importando a biblioteca EXPRESS
import express from "express";
import createUser from "./createUser";
import login from "./login";
import scrap from "./createScrap";


const app = express();

//ARRAY DE USUÁRIOS E RECADOS
export const users = [];
export const messages = [];

//Convertendo o EXPRESS em formato JSON
app.use(express.json());

//CRIAR O USUÁRIO
app.use("/create", createUser);

//LOGIN do usuário
app.use("/login", login);

//Criar um recado
app.use("/scrap", scrap);

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
