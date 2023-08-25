import { Router } from "express";
import { validateUser } from "../middleware/validateUser";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { users } from "../data";

const router = Router();

//CRIAR usuário
router.post("/create", validateUser, async (req, res) => {
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

//LOGIN usuário
router.post("/login", async (req, res) => {
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

export default router;
