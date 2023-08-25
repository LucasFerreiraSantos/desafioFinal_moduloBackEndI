import { Router } from "express";
import { validateUser } from "../middleware/validateUser";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { users } from "..";

const createRouter = Router();

export default createRouter.post("/", validateUser, async (req, res) => {
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
