function status(request, response) {
  response
    .status(200)
    .json({ message: "aluno top é aluno que estuda de madrugada" });
}

export default status;
