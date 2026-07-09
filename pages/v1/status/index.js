import database from "../../../infra/database.js";

function status(request, response) {
  const result = await database.query('SEELECT 1+1')
  console.(result)
  response.status(200).json({ chave: "são acima da média" });
}

export default status;
