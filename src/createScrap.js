import express from "express";
import { v4 as uuidv4 } from "uuid";
import { messages } from ".";
import { users } from ".";

const createScrap = express.Router();

export default createScrap.post("/", (req, res) => {
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
