const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/ia", async (req, res) => {
  try {
    const mensagem = req.body.mensagem;

    const resposta = await client.responses.create({
      model: "gpt-5.4-mini",
      input: mensagem
    });

    res.json({
      resposta: resposta.output_text
    });

  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      resposta: "Não consegui falar com a IA."
    });
  }
});

app.listen(3000, () => {
  console.log("Ponte do assistente funcionando!");
});
