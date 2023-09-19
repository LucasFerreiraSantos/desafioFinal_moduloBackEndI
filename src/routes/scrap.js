import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { messages } from "../data";
import { users } from "../data";

const router = Router();

//CRIAR recados
router.post("/", (req, res) => {
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
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  const { page, perPage } = req.query;

  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({
      message: "Usuário não encontrado!",
    });
  }

  const currentPage = parseInt(page) || 1;
  const itemsPerPage = parseInt(perPage) || 10;

  const usersMessages = messages.filter((message) => message.userId === userId);

  const totalItems = usersMessages.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedMessages = usersMessages.slice(startIndex, endIndex);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  res.json({
    usersMessages: paginatedMessages,
    totalPages,
    currentPage,
  });
});

//ATUALIZAR recados
router.put("/:messageId", (req, res) => {
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

//EXCLUIR recados
router.delete("/:messageId", (req, res) => {
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

export default router;
