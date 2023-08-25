export function validateUser(req, res, next){
  const {name, email, password} = req.body

  if(!name || !email || !password){
    res.status(400).json({
      message: "Dados de entrada não encontrados!"
    })
  }

  next()
}