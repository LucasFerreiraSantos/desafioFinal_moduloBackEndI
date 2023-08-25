import express from "express";
import express from "express";
import bcrypt from "bcrypt";
import { users } from "..";

const loginRouter = express.Router();

export default loginRouter.post("/", async (req, res) => {
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
