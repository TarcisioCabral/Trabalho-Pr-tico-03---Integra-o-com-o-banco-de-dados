const express = require('express');
const app = express();
const connection = require('./database');
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.post('/cadastro', (req, res) => {
  const { titulo, descricao, preco, categoria } = req.body;

  const query = 'INSERT INTO produtos (titulo, descricao, preco, categoria) VALUES (?, ?, ?, ?)';

  connection.query(query, [titulo, descricao, preco, categoria], (error, results, fields) => {
    if (error) {
      res.status(500).send({ success: false, message: 'Erro ao cadastrar produto: ' + error.message });
      return;
    }
    res.status(200).send({ success: true, message: 'Produto cadastrado com sucesso!' });
  });
});

// Rota para obter a lista de produtos
app.get('/products', (req, res) => {
    const query = 'SELECT * FROM produtos';
  
    connection.query(query, (error, results, fields) => {
      if (error) {
        res.status(500).send({ success: false, message: 'Erro ao obter a lista de produtos: ' + error.message });
        return;
      }
      res.status(200).send(results); // Envia a lista de produtos como resposta
    });
  });
  // Rota para excluir um produto por ID
app.delete('/products/:id', (req, res) => {
    const productId = req.params.id;
    const query = 'DELETE FROM produtos WHERE id = ?';
  
    connection.query(query, [productId], (error, results, fields) => {
      if (error) {
        res.status(500).send({ success: false, message: 'Erro ao excluir produto: ' + error.message });
        return;
      }
      res.status(200).send({ success: true, message: 'Produto excluído com sucesso!' });
    });
  });

// Rota para obter detalhes de um produto por ID
app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const query = 'SELECT * FROM produtos WHERE id = ?';

    connection.query(query, [productId], (error, results, fields) => {
        if (error) {
            res.status(500).send({ success: false, message: 'Erro ao obter detalhes do produto: ' + error.message });
            return;
        }

        if (results.length > 0) {
            res.status(200).send(results[0]); // Envie os detalhes do produto como resposta
        } else {
            res.status(404).send({ success: false, message: 'Produto não encontrado.' });
        }
    });
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta ${PORT}");
});